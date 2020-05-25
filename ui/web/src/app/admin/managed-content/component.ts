import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from "@angular/core"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { ManagedContent, ManagedContentType } from "@funk/model/managed-content/managed-content"
import { Identity, IDENTITY } from "@funk/ui/core/identity/interface"
import { Persistence, PERSISTENCE } from "@funk/ui/core/persistence/interface"
import { ManagedContentEditorService } from "@funk/ui/web/app/admin/managed-content/editor/service"
import { Platform } from "@ionic/angular"
import { untilDestroyed, UntilDestroy } from "@ngneat/until-destroy"
import { defer, from, Observable } from "rxjs"
import { first, map, shareReplay, switchMap } from "rxjs/operators"

@UntilDestroy()
@Component({
  selector: "managed-content",
  template: "{{ contentValue$ | async }}",
})
export class ManagedContentComponent implements OnInit, OnDestroy
{
  @Input() public contentId!: string
  @Input() public type: ManagedContentType = ManagedContentType.TEXT

  public isDesktop = this._platform.platforms().includes("desktop")
  public content$: Observable<ManagedContent | undefined> =
  defer(() => from(this._canManageContent()))
    .pipe(
      switchMap((canManageContent) => canManageContent
        ? this._managedContentEditorService
          .listenForPreviewOrLiveContent(this.contentId)
        : this._persistenceApi
          .listenById<ManagedContent>(CONTENTS, this.contentId)
      ),
      untilDestroyed(this),
      shareReplay(1)
    )
  public contentValue$ = this.content$.pipe(
    map((content) => content?.value)
  )

  public constructor(
    private _platform: Platform,
    @Inject(IDENTITY) private _identityApi: Identity,
    @Inject(PERSISTENCE) private _persistenceApi: Persistence,
    private _managedContentEditorService: ManagedContentEditorService
  ) { }

  public async ngOnInit(): Promise<void>
  {
    this.content$.subscribe()
    this.contentValue$.subscribe()
  }

  public ngOnDestroy(): void { }

  @HostListener("click")
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
