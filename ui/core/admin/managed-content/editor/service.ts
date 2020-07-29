import { FormControl } from "@angular/forms"
import { ignoreNullish, shareReplayOnce, maybePluck } from "@funk/helpers/rxjs-shims"
import { USER_STATES, UserState } from "@funk/model/identity/user-state"
import { CONTENTS, ManagedContentType } from "@funk/model/managed-content/managed-content"
import { ManagedContent } from "@funk/model/managed-content/managed-content"
import { asPromise } from "@funk/helpers/as-promise"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import createDocPath from "@funk/helpers/create-doc-path"
import { ContentPreview } from "@funk/model/managed-content/content-preview"
import { Person } from "@funk/model/identity/person"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { construct as constructListenById } from "@funk/ui/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/ui/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/ui/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/ui/plugins/persistence/actions/update-by-id"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { construct as constructGetInnerText } from "@funk/ui/helpers/html/get-inner-text"
import { BehaviorSubject, Observable, combineLatest, from, of } from "rxjs"
import { map, pluck, switchMap, first } from "rxjs/operators"

type PublishConflict = [ ContentPreview, ManagedContent ]

export function construct(
  userSession: UserSession,
  listenById: ReturnType<typeof constructListenById>,
  getById: GetById,
  setById: ReturnType<typeof constructSetById>,
  updateById: ReturnType<typeof constructUpdateById>,
  getInnerText: ReturnType<typeof constructGetInnerText>
)
{
  return new class ManagedContentEditorService
  {
    private _maybeActiveContentId = new BehaviorSubject<string | undefined>(undefined)
    public isActivated = userSession.pipe(
      pluck("auth", "claims", "role"),
      map(roleHasAdminPrivilegeOrGreater)
    )
    public saving = new BehaviorSubject<boolean>(false)
    public activeContent = this._maybeActiveContentId.pipe(
      switchMap((contentId) => !!contentId
        ? this.listenForPreviewOrLiveContent(contentId).pipe(first())
        : of(undefined)),
      shareReplayOnce())
    public activeContentType = this.activeContent.pipe(
      maybePluck("type"),
      shareReplayOnce())
    public activeContentValueControl = this.activeContent.pipe(
      maybePluck("value"),
      map((value) => value ? new FormControl(value) : undefined),
      shareReplayOnce())
    public activeContentValue = this.activeContentValueControl.pipe(
      switchMap((content) => content?.valueChanges ?? of(undefined)),
      shareReplayOnce()
    ) as Observable<string>
    public hasPreview = userSession.pipe(
      ignoreNullish(),
      pluck("person", "id"),
      switchMap((userId) =>
        from(listenById<UserState>(
          USER_STATES,
          userId))
          .pipe(
            maybePluck("contentPreviews"))),
      map((maybeContentPreviews) => !!Object.keys(maybeContentPreviews ?? {}).length),
      shareReplayOnce())
    public contentsUpdatedAfterPreview = new BehaviorSubject<PublishConflict[] | []>([])

    public constructor()
    {
      this.activeContent.subscribe()
      this.activeContentType.subscribe()
      this.activeContentValueControl.subscribe()
      this.activeContentValue.subscribe()
      this.hasPreview.subscribe()
    }

    public manageContent(contentId: string): void
    {
      this._maybeActiveContentId.next(contentId)
    }

    public async saveAndClearIfEditing(): Promise<void>
    {
      const control = await asPromise(this.activeContentValueControl)

      if (control)
      {
        this.saving.next(true)

        const { person } = await asPromise(userSession)
        const content = await asPromise(this.activeContent)
        const contentId = await asPromise(this._maybeActiveContentId) as string
        const htmlValue = await asPromise(this.activeContentValue)

        try
        {
          const userStateUpdate = {
            [createDocPath<UserState>("contentPreviews", contentId, "content")]: {
              value: content!.type === ManagedContentType.HTML
                ? htmlValue
                : getInnerText(htmlValue),
            } as ManagedContent,
          } as Partial<UserState>

          await updateById<UserState>(
            USER_STATES,
            person.id,
            userStateUpdate
          )
        }
        catch (error)
        {
          console.log("There was an error updating the preview.", error)
        }
        this.saving.next(false)
        this._clear()
      }
    }

    public async maybePublishAll(): Promise<void>
    {
      const { person, auth } = await asPromise(userSession)

      // Do nothing if the user is not an admin.
      if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) return

      // Do nothing if no content previews exist.
      const maybeContentPreviews = await this._maybeGetContentPreviews(person)
      if (!maybeContentPreviews)
      {
        console.log("Couldn't find a preview to publish.")
        return
      }

      for (const contentId of Object.keys(maybeContentPreviews!))
      {
        try { await this._publishOrReportConflict(contentId, maybeContentPreviews!, person) }
        catch (error)
        {
          // TODO: Communicate this error to the user.
          console.error(error)
          continue
        }
      }
    }

    // "Publish mine anyway"
    public async publishOne(contentId: PrimaryKey): Promise<void>
    {
      const { person, auth } = await asPromise(userSession)
      // Do nothing if the user is not an admin.
      if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) return

      await this._publishAndDeleteContentPreview(person, contentId)

      this._removeFromContentsUpdatedAfterPreview(contentId)
    }

    // "Discard mine"
    public async removePreview(contentId: PrimaryKey): Promise<void>
    {
      const { person } = await asPromise(userSession)

      const maybeContentPreviews = await this._maybeGetContentPreviews(person)
      const newContentPreviews = { ...maybeContentPreviews }
      delete newContentPreviews[contentId]
      await updateById<UserState>(
        USER_STATES,
        person.id,
        {
          contentPreviews: newContentPreviews,
        }
      )

      const contentsUpdatedAfterPreview = [ ...this.contentsUpdatedAfterPreview.getValue() ]
      const indexOfContentUpdatedAfterPreview = contentsUpdatedAfterPreview.findIndex(
        ([ _, managedContent ]) => managedContent.id === contentId)
      if (indexOfContentUpdatedAfterPreview > -1)
      {
        contentsUpdatedAfterPreview.splice(indexOfContentUpdatedAfterPreview, 1)
        this.contentsUpdatedAfterPreview.next(contentsUpdatedAfterPreview)
      }
    }

    public cancel(): void
    {
      this._clear()
    }

    public listenForPreviewOrLiveContent(
      contentId: string
    ): Observable<ManagedContent | undefined>
    {
      return userSession
        .pipe(
          ignoreNullish(),
          pluck("auth", "id"),
          switchMap((userId) =>
            combineLatest(
              from(listenById<UserState>(
                USER_STATES,
                userId))
                .pipe(
                  map((user) => user?.contentPreviews?.[contentId]?.content)),
              from(listenById<ManagedContent>(
                CONTENTS,
                contentId)))
              .pipe(
                map(([ preview, content ]) => preview || content))))
    }

    private _clear(): void
    {
      this._maybeActiveContentId.next(undefined)
    }

    private async _maybeGetContentPreviews(
      person: Person
    ): Promise<{ [contentId: string]: ContentPreview } | undefined>
    {
      const userState = await getById<UserState>(
        USER_STATES,
        person.id
      )
      return userState?.contentPreviews
    }

    private _removeFromContentsUpdatedAfterPreview(contentId: string): void
    {
      const contentsUpdatedAfterPreview = [ ...this.contentsUpdatedAfterPreview.getValue() ]
      const indexOfContentUpdatedAfterPreview = contentsUpdatedAfterPreview.findIndex(
        ([ _, managedContent ]) => managedContent.id === contentId)
      if (indexOfContentUpdatedAfterPreview > -1)
      {
        contentsUpdatedAfterPreview.splice(indexOfContentUpdatedAfterPreview, 1)
        this.contentsUpdatedAfterPreview.next(contentsUpdatedAfterPreview)
      }
    }

    private async _publishAndDeleteContentPreview(
      person: Person,
      contentId: string
    ): Promise<void>
    {
      const contentPreviews = await this._maybeGetContentPreviews(person)
      await setById<ManagedContent>(CONTENTS, contentId, contentPreviews![contentId].content)
      const newContentPreviews = { ...contentPreviews }
      delete newContentPreviews[contentId]
      await updateById<UserState>(USER_STATES, person.id, {
        contentPreviews: newContentPreviews,
      })
    }

    private async _publishOrReportConflict(
      contentId: PrimaryKey,
      contentPreviews: { [contentId: string]: ContentPreview },
      person: Person
    ): Promise<void>
    {
      const contentPreview = contentPreviews[contentId]
      const content = await getById<ManagedContent>(CONTENTS, contentId)
      const contentWasUpdatedAfterPreview =
        content!.updatedAt! > contentPreview.createdAt
      if (contentWasUpdatedAfterPreview)
      {
        const contentsUpdatedAfterPreview: PublishConflict[] = [
          ...this.contentsUpdatedAfterPreview.getValue(),
          [ contentPreview, content! ],
        ]
        this.contentsUpdatedAfterPreview.next(contentsUpdatedAfterPreview)
      }
      else
      {
        await this._publishAndDeleteContentPreview(person, contentId)
      }
    }
  }
}

export type ManagedContentEditorService = ReturnType<typeof construct>
