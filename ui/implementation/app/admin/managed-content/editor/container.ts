import { Component, OnInit, ViewChild, Inject } from "@angular/core"
import {
  ManagedContentEditorService,
} from "@funk/ui/core/admin/managed-content/editor/service"
import { MANAGED_CONTENT_EDITOR_SERVICE } from "@funk/ui/app/admin/managed-content/tokens"
import { USER_SESSION } from "@funk/ui/app/identity/tokens"
import { ActivatedRoute } from "@angular/router"
import { UserSession } from "@funk/ui/core/identity/user-session"
import roleHasAdminPrivilegeOrGreater from
  "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { IonTextarea } from "@ionic/angular"
import { ReplaySubject, merge, of, combineLatest } from "rxjs"
import { delay, startWith, switchMap, tap, throttleTime, map } from "rxjs/operators"

const ANIMATION_DURATION_MS = 500

@Component({
  selector: "managed-content-editor",
  template: `
    <div [ngClass]="{
      'managed-content-editor-wrapper': true,
      'has-preview': hasPreview | async,
      'admin-edit-mode-is-on': adminEditModeIsOn | async
    }">
      <div *ngIf="hasPreview | async"
        id="has-preview-notice">
        You are looking at a preview
        <button (click)="maybeSaveAndPublish()">Publish</button>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-container *ngIf="maybeFormControl | async">
      <div
        id="managed-content-editor-drawer"
        [ngClass]="{
          'animate-in': !(cssAnimatingOut | async),
          'animate-out': cssAnimatingOut | async
        }"
        (clickOutside)="cancelEdit()">
        <ion-card>
          <ion-textarea #contentValueInput
            [formControl]="maybeFormControl | async">
          </ion-textarea>
          <div class="drawer-card-actions">
            <ion-button type="button" (click)="saveEdit()">Save</ion-button>
            <ion-button [fill]="'outline'" type="button" (click)="cancelEdit()">
              Cancel
            </ion-button>
          </div>
        </ion-card>
      </div>
    </ng-container>
  `,
  styleUrls: [ "./container.scss" ],
})
export class ManagedContentEditorContainer implements OnInit
{
  @ViewChild("contentValueInput") public contentValueInput!: IonTextarea
  private _cssAnimatingOut = new ReplaySubject<boolean>(1)
  public maybeFormControl = this._editorService.activeContentValueControl
  public hasPreview = this._editorService.hasPreview
  public cssAnimatingOut = this._cssAnimatingOut.pipe(
    startWith(false),
    throttleTime(ANIMATION_DURATION_MS),
    switchMap((isAnimating) => isAnimating
      ? merge(
        of(isAnimating),
        of(false).pipe(
          delay(ANIMATION_DURATION_MS),
          tap(() => this._editorService.cancel())))
      : of(isAnimating)))
  public adminEditModeIsOn = combineLatest(
    this._userSession,
    this._activatedRoute.queryParams)
    .pipe(
      map(([ { auth }, params ]) => roleHasAdminPrivilegeOrGreater(auth.claims.role)
        && params["edit"] === "true"))

  public constructor(
    private _activatedRoute: ActivatedRoute,
    @Inject(USER_SESSION) private _userSession: UserSession,
    @Inject(MANAGED_CONTENT_EDITOR_SERVICE)
    private _editorService: ManagedContentEditorService
  )
  { }

  public ngOnInit = (): void =>
  {
    this.maybeFormControl.subscribe(() =>
    {
      setTimeout(
        () => this.contentValueInput.setFocus(),
        100
      )
    })
  }

  public animateOut = (): void => this._cssAnimatingOut.next(true)

  public saveEdit = async (): Promise<void> =>
    await this._editorService.saveAndClearIfEditing()

  public cancelEdit = async (): Promise<void> =>
    this.animateOut()

  public maybeSaveAndPublish = async (): Promise<void> =>
  {
    await this.saveEdit()
    await this._editorService.maybePublishAll()
  }
}
