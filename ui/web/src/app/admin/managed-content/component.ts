import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core'
import { CONTENTS } from '@funk/model/admin/content/content'
import { ManagedContent, ManagedContentType } from '@funk/model/managed-content/managed-content'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { MortalityAware } from '@funk/ui/helpers/angular.helpers'
import { ManagedContentEditorService } from '@funk/ui/web/app/admin/managed-content/editor/service'
import { Platform } from '@ionic/angular'
import { Observable } from 'rxjs'
import { first, map, shareReplay } from 'rxjs/operators'

@MortalityAware()
@Component({
  selector: 'managed-content',
  template: `{{ contentValue$ | async }}`,
})
export class ManagedContentComponent implements OnInit, OnDestroy
{
  @Input() public contentId!: string
  @Input() public type: ManagedContentType = ManagedContentType.TEXT

  public isDesktop = this._platform.platforms().includes('desktop')
  public content$!: Observable<ManagedContent | undefined>
  public contentValue$!: Observable<string | undefined>

  constructor(
    private _platform: Platform,
    @Inject(IdentityApi) private _identityApi: Identity,
    @Inject(PersistenceApi) private _persistenceApi: Persistence,
    private _managedContentEditorService: ManagedContentEditorService,
  ) { }

  public async ngOnInit(): Promise<void>
  {
    if (await this._canManageContent())
    {
      this.content$ = this._managedContentEditorService
        .listenForPreviewOrLiveContent(this.contentId)
        .pipe(
          shareReplay(1)
        )
    }
    else
    {
      this.content$ = this._persistenceApi.listenById<ManagedContent>(
        CONTENTS,
        this.contentId,
      )
    }

    this.contentValue$ = this.content$.pipe(
      map((content) => content?.value)
    )
  }

  public ngOnDestroy(): void
  { }

  @HostListener('click')
  public async handleEditClick(): Promise<void>
  {
    if (await this._canManageContent())
    {
      this._managedContentEditorService.manageContent(this.contentId)
    }
  }

  private async _canManageContent(): Promise<boolean>
  {
    return this.isDesktop
      && await this._identityApi.hasAdminPrivilegeOrGreater$
        .pipe(first()).toPromise().then((hasAdminPrivilege) => !!hasAdminPrivilege)
  }
}
