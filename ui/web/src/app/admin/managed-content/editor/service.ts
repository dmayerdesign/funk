import { Injectable } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { ManagedContent } from '@funk/model/managed-content/managed-content'
import { StoreApi } from '@funk/ui/core/store/api'
import { combineLatest, of, BehaviorSubject, Observable } from 'rxjs'
import { first, shareReplay, switchMap } from 'rxjs/operators'

@Injectable()
export class ManagedContentEditorService
{
  // Control keys are the full document path.
  // Control values are the `ManagedContent` documents.
  private _managedContents = new FormGroup({})
  private _activeContentPath =
    new BehaviorSubject<[string, string] | undefined>(undefined)
  public activeContentControl: Observable<FormGroup | undefined> = this._activeContentPath.pipe(
    switchMap((activeContentPath) =>
    {
      if (!activeContentPath)
      {
        return of(undefined)
      }
      else
      {
        const [ collectionPath, contentDocumentPath ] = activeContentPath
        const activeContentFullPath = this._getFullPath(
          collectionPath,
          contentDocumentPath,
        )
        if (!this._managedContents.controls[activeContentFullPath])
        {
          return this._storeApi
            .getById<ManagedContent>(
              collectionPath,
              contentDocumentPath,
            )
            .then((managedContent) =>
            {
              this._managedContents.addControl(
                activeContentFullPath,
                new FormGroup(
                  managedContent
                    ? Object.keys(managedContent)
                      .reduce(
                        (controls, controlName) =>
                        {
                          controls[controlName] = new FormControl(
                            managedContent[controlName as keyof ManagedContent]
                          )
                          return controls
                        },
                        {} as { [key: string]: FormControl },
                      )
                    : {}
                ),
              )
              return this._managedContents.controls[activeContentFullPath] as FormGroup
            })
        }
        return of(this._managedContents.controls[activeContentFullPath] as FormGroup)
      }
    }),
    shareReplay(1),
  )

  constructor(
    private _storeApi: StoreApi,
  ) { }

  public async manageContent(
    collectionPath: string,
    contentDocumentPath: string,
  ): Promise<void>
  {
    this._activeContentPath.next([ collectionPath, contentDocumentPath ])
  }

  public async save(): Promise<void>
  {
    const [ control, dbPath ] = await combineLatest(
        this.activeContentControl,
        this._activeContentPath,
      )
      .pipe(first())
      .toPromise()
    const [ collectionPath, documentPath ] = dbPath || []

    if (
      control
      && control.value
      && dbPath
      && collectionPath && documentPath
    )
    {
      await this._storeApi.updateById(collectionPath, documentPath, control.value)
    }

    this._clear()
  }

  public cancel(): void
  {
    this._clear()
  }

  private _clear(): void
  {
    this._activeContentPath.next(undefined)
  }

  private _getFullPath(collectionPath: string, documentPath: string): string
  {
    return collectionPath + '/' + documentPath
  }
}
