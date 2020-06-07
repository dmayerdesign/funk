import { Inject, Injectable } from "@angular/core"
import { FormControl } from "@angular/forms"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { swallowErrorAndMapTo } from "@funk/helpers/rxjs-shims"
import { USER_STATES, UserState } from "@funk/model/identity/user-state"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { ManagedContent } from "@funk/model/managed-content/managed-content"
import { BehaviorSubject, Observable, combineLatest, from, of } from "rxjs"
import { first, map, pluck, shareReplay, switchMap } from "rxjs/operators"
import { LISTEN_BY_ID, GET_BY_ID, SET_BY_ID, UPDATE_BY_ID } from "@funk/ui/app/persistence/tokens"
import { construct as constructListenById } from "@funk/plugins/persistence/actions/listen-by-id"
import { GetById } from "@funk/plugins/persistence/actions/get-by-id"
import { construct as constructSetById } from "@funk/plugins/persistence/actions/set-by-id"
import { construct as constructUpdateById } from "@funk/plugins/persistence/actions/update-by-id"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import UserSession from "@funk/ui/app/identity/user-session"
import { asPromise } from "@funk/helpers/as-promise"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"

@Injectable()
export class ManagedContentEditorService
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
  public hasPreview = this._userSession.pipe(
    ignoreNullish(),
    pluck("person", "id"),
    switchMap((userId) =>
      from(this._listenById<UserState>(
        USER_STATES,
        userId))
        .pipe(
          ignoreNullish(),
          pluck("contentPreviews"),
          swallowErrorAndMapTo(undefined))),
    map((maybeContentPreviews) => maybeContentPreviews
      && Object.keys(maybeContentPreviews).length),
    shareReplay(1))

  public constructor(
    @Inject(USER_SESSION) private _userSession: UserSession,
    @Inject(LISTEN_BY_ID) private _listenById: ReturnType<typeof constructListenById>,
    @Inject(GET_BY_ID) private _getById: GetById,
    @Inject(SET_BY_ID) private _setById: ReturnType<typeof constructSetById>,
    @Inject(UPDATE_BY_ID) private _updateById: ReturnType<typeof constructUpdateById>
  )
  { }

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
      const { person } = await asPromise(this._userSession)
      const contentId = await asPromise(this._maybeActiveContentId) as string
      await this._setById<UserState>(
        USER_STATES,
        person.id,
        {
          contentPreviews: {
            [contentId]: { value: control.value } as ManagedContent,
          },
        } as UserState
      )
      this.saving.next(false)
      this._clear()
    }
  }

  public async maybePublish(): Promise<void>
  {
    const { person, auth } = await asPromise(this._userSession)

    if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) return

    const userState = await this._getById<UserState>(
      USER_STATES,
      person.id
    )
    if (userState?.contentPreviews)
    {
      for (const contentId of Object.keys(userState.contentPreviews))
      {
        try
        {
          await this._setById(
            CONTENTS,
            contentId,
            userState.contentPreviews[contentId]
          )
        }
        catch (error)
        {
          console.error(error)
          continue
        }

        const newContentPreviews = { ...userState.contentPreviews }
        delete newContentPreviews[contentId]

        await this._updateById<UserState>(
          USER_STATES,
          person.id,
          {
            contentPreviews: newContentPreviews,
          }
        )
      }
    }
    else
    {
      console.log("Couldn't find a preview to publish.")
    }
  }

  public cancel(): void
  {
    this._clear()
  }

  public listenForPreviewOrLiveContent(
    contentId: string): Observable<ManagedContent | undefined>
  {
    return this._userSession
      .pipe(
        ignoreNullish(),
        pluck("person", "id"),
        switchMap((userId) =>
          combineLatest(
            from(this._listenById<UserState>(
              USER_STATES,
              userId))
              .pipe(
                map((user) => user?.contentPreviews?.[contentId]),
                swallowErrorAndMapTo(undefined)),
            from(this._listenById<ManagedContent>(
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
}
