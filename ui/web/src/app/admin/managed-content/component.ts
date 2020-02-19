import { Component, HostListener, Input } from '@angular/core'
import { ManagedContentType } from '@funk/model/managed-content/managed-content'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Platform } from '@ionic/angular'
import { first } from 'rxjs/operators'
import { ManagedContentEditorService } from './editor/service'

@Component({
  selector: 'managed-content',
  template: `
    <ng-content></ng-content>
  `,
})
export class ManagedContentComponent
{
  @Input() public collectionPath!: string
  @Input() public documentPath!: string
  @Input() public type: ManagedContentType = ManagedContentType.TEXT

  public isDesktop = this._platform.platforms().includes('desktop')

  constructor(
    private _platform: Platform,
    private _identityApi: IdentityApi,
    private _managedContentEditorService: ManagedContentEditorService,
  ) { }

  @HostListener('click')
  public async handleEditClick(): Promise<void>
  {
    this._identityApi.hasAdminPrivilegeOrGreater$
      .pipe(first())
      .subscribe((isAdmin) =>
      {
        if (this.isDesktop && isAdmin)
        {
          this._managedContentEditorService.manageContent(
            this.collectionPath,
            this.documentPath,
          )
        }
      })
  }

  // private _appendEditButton(): void
  // {
  //   setTimeout(() =>
  //   {
  //     if (this.isDesktop && this._elementRef.nativeElement
  //       && typeof this._elementRef.nativeElement.querySelector === 'function')
  //     {
  //       const editButton = this._createEditButton()
  //       this._renderer.appendChild(
  //         this._elementRef.nativeElement.querySelector('*'),
  //         editButton,
  //       )
  //     }
  //   })
  // }
  // private _createEditButton(): any
  // {
  //   const editButton = this._renderer.createElement('button') as ElementRef
  //   this._renderer.setProperty(editButton, 'id', this._getEditButtonId())
  //   this._renderer.setProperty(editButton, 'className', 'mc--edit-button')
  //   this._renderer.setProperty(editButton, 'innerText', 'Edit')
  //   this._renderer.listen(editButton, 'click', () => { this._handleEditButtonClick() })
  //   return editButton
  // }
  // private _getEditButtonId(): string
  // {
  //   return this.managerId + '--edit-button'
  // }
}
