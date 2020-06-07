import { Component, OnInit, ViewChild } from "@angular/core"
import {
  ManagedContentEditorService,
} from "@funk/ui/app/admin/managed-content/editor/service"
import { IonTextarea } from "@ionic/angular"
import { ReplaySubject, merge, of } from "rxjs"
import { delay, startWith, switchMap, tap, throttleTime } from "rxjs/operators"

const ANIMATION_DURATION_MS = 500

@Component({
  selector: "managed-content-editor",
  template: `
    <div class="managed-content-editor-wrapper">
      <div *ngIf="hasPreview | async">
        You are looking at a preview
        <button (click)="maybeSaveAndPublish()">Publish</button>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-container *ngIf="maybeFormControl | async">
      <div
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
          tap(() => this._editorService.cancel())
        )
      )
      : of(isAnimating)
    )
  )

  public constructor(
    private _editorService: ManagedContentEditorService
  )
  { }

  public ngOnInit(): void
  {
    this.maybeFormControl.subscribe(() =>
    {
      setTimeout(
        () => this.contentValueInput.setFocus(),
        100
      )
    })
  }

  public animateOut(): void
  {
    this._cssAnimatingOut.next(true)
  }

  public async saveEdit(): Promise<void>
  {
    await this._editorService.saveAndClearIfEditing()
  }

  public async cancelEdit(): Promise<void>
  {
    this.animateOut()
  }

  public async maybeSaveAndPublish(): Promise<void>
  {
    await this.saveEdit()
    await this._editorService.maybePublish()
  }
}
