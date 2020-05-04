import { Inject, Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import { UserState, USER_STATES } from '@funk/model/identity/user-state'
import { CONTENTS } from '@funk/model/managed-content/managed-content'
import { ManagedContent } from '@funk/model/managed-content/managed-content'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { combineLatest, from, of, BehaviorSubject, Observable } from 'rxjs'
import { catchError, first, map, pluck, shareReplay, switchMap } from 'rxjs/operators'

@Injectable()
export class ManagedContentEditorService
{
  private _maybeActiveContentId =
    new BehaviorSubject<string | undefined>(undefined)
  public saving = new BehaviorSubject<boolean>(false)
  public activeContentValueControl = this._maybeActiveContentId
    .pipe(
      switchMap((contentId) => !contentId
        ? of(undefined)
        : this.listenForPreviewOrLiveContent(contentId)
          .pipe(
            ignoreNullish(),
            first(),
            pluck('value'),
            map((value) => new FormControl(value)),
          )
      ),
      shareReplay(1),
    )
  public hasPreview = this._identityApi.userId$.pipe(
    ignoreNullish(),
    switchMap((userId) =>
      from(this._persistenceApi.listenById<UserState>(
        USER_STATES,
        userId,
        ))
        .pipe(
          pluck<UserState | undefined, UserState['contentPreviews']>('contentPreviews'),
          catchError(() => of(undefined)),
        )
    ),
    map((maybeContentPreviews) => maybeContentPreviews
      && Object.keys(maybeContentPreviews).length),
    shareReplay(1),
  )

  constructor(
    @Inject(PersistenceApi) private _persistenceApi: Persistence,
    @Inject(IdentityApi) private _identityApi: Identity,
  )
  { }

  public manageContent(contentId: string): void
  {
    this._maybeActiveContentId.next(contentId)
  }

  public async saveAndClearIfEditing(): Promise<void>
  {
    const control = await this.activeContentValueControl.pipe(first()).toPromise()
    if (control)
    {
      this.saving.next(true)
      const userId = await this._identityApi.userId$.pipe(first()).toPromise()
      const contentId = await this._maybeActiveContentId
        .pipe(first()).toPromise() as string
      await this._persistenceApi.setById<UserState>(
        USER_STATES,
        userId,
        {
          contentPreviews: {
            [contentId]: { value: control.value } as ManagedContent,
          },
        } as UserState,
      )
      this.saving.next(false)
      this._clear()
    }
  }

  public async maybePublish(): Promise<void>
  {
    const userId = await this._identityApi.userId$.pipe(first()).toPromise()
    const userState = await this._persistenceApi.getById<UserState>(
      USER_STATES,
      userId,
    )
    if (userState?.contentPreviews)
    {
      for (const contentId of Object.keys(userState.contentPreviews))
      {
        try
        {
          await this._persistenceApi.setById(
            CONTENTS,
            contentId,
            userState.contentPreviews[contentId],
          )
        }
        catch (error)
        {
          console.error(error)
          continue
        }
        const newContentPreviews = { ...userState.contentPreviews }
        delete newContentPreviews[contentId]
        await this._persistenceApi.updateById<UserState>(
          USER_STATES,
          userId,
          {
            contentPreviews: newContentPreviews,
          },
        )
      }
    }
    else
    {
      console.log(`Couldn't find a preview to publish.`)
    }
  }

  public cancel(): void
  {
    this._clear()
  }

  public listenForPreviewOrLiveContent(contentId: string):
    Observable<ManagedContent | undefined>
  {
    return this._identityApi.userId$
      .pipe(
        ignoreNullish(),
        switchMap((userId) =>
          combineLatest(
            from(this._persistenceApi.listenById<UserState>(
              USER_STATES,
              userId,
              ))
              .pipe(
                map((user) => user?.contentPreviews?.[contentId]),
                catchError(() => of(undefined)),
              ),
            from(this._persistenceApi.listenById<ManagedContent>(
              CONTENTS,
              contentId,
              ))
              .pipe(
                catchError(() => of(undefined))
              ),
            )
            .pipe(
              map(([ preview, content ]) => preview || content),
            ),
        ),
      )
  }

  private _clear(): void
  {
    this._maybeActiveContentId.next(undefined)
  }
}
