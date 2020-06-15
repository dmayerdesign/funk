import { FormControl } from "@angular/forms"
import { ignoreNullish, assertNotNullish } from "@funk/helpers/rxjs-shims"
import { swallowErrorAndMapTo } from "@funk/helpers/rxjs-shims"
import { USER_STATES, UserState } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { ManagedContent } from "@funk/model/managed-content/managed-content"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { asPromise } from "@funk/helpers/as-promise"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import createDocPath from "@funk/helpers/create-doc-path"
import { ContentPreview } from "@funk/model/managed-content/content-preview"
import { Person } from "@funk/model/identity/person"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { BehaviorSubject, Observable, combineLatest, from, of } from "rxjs"
import { first, map, pluck, shareReplay, switchMap } from "rxjs/operators"
import { tapAndLog } from "@funk/helpers/tap-and-log"

type PublishConflict = [ ContentPreview, ManagedContent ]

export function construct(
  userSession: UserSession,
  listenById: ReturnType<typeof constructListenById>,
  getById: GetById,
  setById: ReturnType<typeof constructSetById>,
  updateById: ReturnType<typeof constructUpdateById>
)
{
  return new class ManagedContentEditorService
  {
    private _maybeActiveContentId = new BehaviorSubject<string | undefined>(undefined)
    public saving = new BehaviorSubject<boolean>(false)
    public activeContentValueControl = this._maybeActiveContentId
      .pipe(
        switchMap((contentId) => !contentId
          ? of(undefined)
          : this.listenForPreviewOrLiveContent(contentId)
            .pipe(
              ignoreNullish(),
              first(),
              pluck("value"),
              map((value) => new FormControl(value)))),
        shareReplay(1))
    public hasPreview = userSession.pipe(
      ignoreNullish(),
      pluck("person", "id"),
      switchMap((userId) =>
        from(listenById<UserState>(
          USER_STATES,
          userId))
          .pipe(
            tapAndLog("got here"),
            assertNotNullish(),
            pluck("contentPreviews"),
            swallowErrorAndMapTo(undefined))),
      map((maybeContentPreviews) => Object.keys(maybeContentPreviews!).length),
      swallowErrorAndMapTo(false),
      shareReplay(1))
    public contentsUpdatedAfterPreview = new BehaviorSubject<PublishConflict[] | []>([])

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
        const contentId = await asPromise(this._maybeActiveContentId) as string
        await updateById<UserState>(
          USER_STATES,
          person.id,
          {
            [createDocPath<UserState>("contentPreviews", contentId, "content")]: {
              value: control.value,
            } as ManagedContent,
          } as Partial<UserState>
        )
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
                  map((user) => user?.contentPreviews?.[contentId]?.content),
                  swallowErrorAndMapTo(undefined)),
              from(listenById<ManagedContent>(
                CONTENTS,
                contentId))
                .pipe(
                  swallowErrorAndMapTo(undefined)))
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
