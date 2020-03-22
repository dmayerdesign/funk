import { Inject, Injectable } from '@angular/core'
import { FormControl } from '@angular/forms'
import { CONTENTS } from '@funk/model/admin/content/content'
import { UserState, USER_STATES } from '@funk/model/identity/user-state'
import { ManagedContent } from '@funk/model/managed-content/managed-content'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { ignoreNullish, mapToKey } from '@funk/ui/helpers/rxjs-shims'
import { combineLatest, from, of, BehaviorSubject, Observable } from 'rxjs'
import { catchError, first, map, shareReplay, switchMap } from 'rxjs/operators'

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
            mapToKey('value'),
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
          mapToKey('contentPreviews'),
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
      console.log('attempting update?', userState.contentPreviews)
      for (const contentId of Object.keys(userState.contentPreviews))
      {
        console.log('setting live', contentId)
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
          console.log(error)
          continue
        }
        console.log(`we're live!`)
        const newContentPreviews = { ...userState.contentPreviews }
        delete newContentPreviews[contentId]
        console.log('attempting update...')
        await this._persistenceApi.updateById<UserState>(
          USER_STATES,
          userId,
          {
            contentPreviews: newContentPreviews,
          },
        )
        console.log('updated!', contentId)
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
                  mapToKey('contentPreviews'),
                  mapToKey(contentId),
                  catchError(() => of(undefined)),
                ),
              from(this._persistenceApi.listenById<ManagedContent>(
                CONTENTS,
                contentId,
                ))
                .pipe(catchError(() => of(undefined))),
            )
            .pipe(
              map(([ preview, content ]) => preview || content),
            )
          ),
      )
  }

  private _clear(): void
  {
    this._maybeActiveContentId.next(undefined)
  }
}
