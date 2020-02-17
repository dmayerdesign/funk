import { AfterContentInit, Component, Input, NgZone, OnInit } from '@angular/core'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { StoreApi } from '@funk/ui/core/store/api'
import { Platform } from '@ionic/angular'
import { kebabCase } from 'lodash'
import { Observable } from 'rxjs'
import { filter, first, map } from 'rxjs/operators'
import { ManagedContentType } from './type'

@Component({
  selector: 'managed-content',
  template: `
    <div [id]="managerOutletId" [ngClass]="'manager-outlet'"></div>

    <ng-content></ng-content>

    <form *ngIf="isDesktop && (isAdmin$ | async) && isEditing"
      [ngClass]="'editor'">
      <textarea [formControl]="updatedContentValueControl">
      </textarea>
    </form>
  `,
  styleUrls: [ './component.scss' ],
})
export class ManagedContentComponent implements AfterContentInit, OnInit
{
  @Input() public collectionPath!: string
  @Input() public documentPath!: string
  @Input() public type: ManagedContentType = ManagedContentType.TEXT

  public isAdmin$ = this._identityApi.hasAdminPrivilegeOrGreater$
  public isDesktop = this._platform.platforms().includes('desktop')
  public managerId!: string
  public managerOutletId!: string
  public content$!: Observable<any>

  constructor(
    private _ngZone: NgZone,
    private _platform: Platform,
    private _identityApi: IdentityApi,
    private _storeApi: StoreApi,
  ) { }

  public ngOnInit(): void
  {
    this.managerId = kebabCase(
      `mc-${this.collectionPath}-${this.documentPath}-${Date.now()}`
    )
    this.managerOutletId = this.managerId + '-outlet'
    this.content$ = this._storeApi
      .getDocumentValueChanges(this.collectionPath, this.documentPath)
      .pipe(
        map((doc) => doc && (doc as any).value),
      )
  }

  public ngAfterContentInit(): void
  {
    this._identityApi.hasAdminPrivilegeOrGreater$
      .pipe(
        first(),
        filter((hasAdminPrivilegeOrGreater) => !!hasAdminPrivilegeOrGreater),
      )
      .subscribe(() =>
      {
        this._ngZone.run(() =>
        {
          // TODO: Use Web Components?
          setTimeout(() =>
          {
            if (
              this.isDesktop
              && typeof window !== 'undefined'
              && typeof window.document !== 'undefined'
            )
            {
              const targetElement = window.document
                .querySelector(`#${this.managerOutletId} + *`) as HTMLElement
              const editButton = this._createEditButton()
              targetElement.append(editButton)
            }
          })
        })
      })
  }

  private _createEditButton(): HTMLElement
  {
    const editButton = window.document.createElement('button')
    editButton.id = this._getEditButtonId()
    editButton.className = 'mc--edit-button'
    editButton.innerText = 'Edit'
    editButton.onclick = () => this._handleEditButtonClick()
    return editButton
  }

  // private _getEditButton(): HTMLElement
  // {
  //   return window.document.getElementById(this._getEditButtonId()) as HTMLElement
  // }

  private _getEditButtonId(): string
  {
    return this.managerId + '--edit-button'
  }

  private async _handleEditButtonClick(): Promise<void>
  {
    // if (this.isEditing)
    // {
    //   const updatedContentValue = await this.updatedContentValue$.pipe(first()).toPromise()
    //   await this._storeApi.updateById<any>(
    //     this.collectionPath,
    //     this.documentPath,
    //     { value: updatedContentValue }
    //   )
    //   this.isEditing = false
    //   this._getEditButton().innerText = 'Edit'
    // }
    // else
    // {
    //   const contentData = await this._storeApi.getById(
    //     this.collectionPath,
    //     this.documentPath,
    //   )
    //   if (contentData)
    //   {
    //     this.updatedContentValueControl.setValue((contentData as any).value)
    //     this.isEditing = true
    //     this._getEditButton().innerText = 'Save'
    //   }
    // }
  }
}
