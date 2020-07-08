import { Component, HostListener, Inject, Input, OnDestroy, OnInit } from "@angular/core"
import { CONTENTS } from "@funk/model/managed-content/managed-content"
import { ManagedContent, ManagedContentType } from "@funk/model/managed-content/managed-content"
import { ManagedContentEditorService } from "@funk/ui/core/admin/managed-content/editor/service"
import { LISTEN_BY_ID } from "@funk/ui/app/persistence/tokens"
import { construct as constructListenById } from "@funk/ui/plugins/persistence/actions/listen-by-id"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { UserSession } from "@funk/ui/core/identity/user-session"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { asPromise } from "@funk/helpers/as-promise"
import { MANAGED_CONTENT_EDITOR_SERVICE } from "@funk/ui/app/admin/managed-content/tokens"
import { Platform } from "@ionic/angular"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { map, shareReplay, switchMap, pluck } from "rxjs/operators"
import { Observable, defer, from } from "rxjs"

@UntilDestroy()
@Component({
  selector: "managed-content",
  template: "{{ contentValue | async }}",
})
export class ManagedContentComponent implements OnInit, OnDestroy
{
  @Input() public contentId!: string
  @Input() public type: ManagedContentType = ManagedContentType.TEXT

  public isDesktop = this._platform.platforms().includes("desktop")
  public content: Observable<ManagedContent | undefined> = defer(() =>
    from(this._canManageContent()))
    .pipe(
      switchMap((canManageContent) => canManageContent
        ? this._editorService
          .listenForPreviewOrLiveContent(this.contentId)
        : this._listenById<ManagedContent>(CONTENTS, this.contentId)
      ),
      untilDestroyed(this),
      shareReplay(1)
    )
  public contentValue = this.content.pipe(
    map((content) => content?.value)
  )

  public constructor(
    private _platform: Platform,
    @Inject(USER_SESSION) private _userSession: UserSession,
    @Inject(LISTEN_BY_ID) private _listenById: ReturnType<typeof constructListenById>,
    @Inject(MANAGED_CONTENT_EDITOR_SERVICE)
    private _editorService: ManagedContentEditorService
  ) { }

  public async ngOnInit(): Promise<void>
  {
    this.content.subscribe()
    this.contentValue.subscribe()
  }

  public ngOnDestroy(): void { }

  @HostListener("click")
  public async handleEditClick(): Promise<void>
  {
    if (await this._canManageContent())
    {
      this._editorService.manageContent(this.contentId)
    }
  }

  private async _canManageContent(): Promise<boolean>
  {
    return this.isDesktop
      && await asPromise(this._userSession
        .pipe(
          pluck("auth", "claims", "role"),
          map(roleHasAdminPrivilegeOrGreater)))
  }
}
