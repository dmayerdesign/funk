import { Component, OnInit, ViewChild } from '@angular/core'
import {
  ManagedContentEditorService,
} from '@funk/ui/web/app/admin/managed-content/editor/service'
import { IonTextarea } from '@ionic/angular'
import { merge, of, ReplaySubject } from 'rxjs'
import { delay, map, startWith, switchMap, tap, throttleTime } from 'rxjs/operators'

const ANIMATION_DURATION_MS = 500

@Component({
  selector: 'managed-content-editor',
  template: `
    <ng-container *ngIf="maybeFormGroup | async">
      <div
        [ngClass]="{
          'animate-in': !(cssAnimatingOut | async),
          'animate-out': cssAnimatingOut | async
        }"
        (clickOutside)="cancelEdit()">
        <ion-card>
          <form [formGroup]="maybeFormGroup | async">
            <ion-textarea #contentValueInput
              [formControl]="maybeFormControl | async">
            </ion-textarea>
            <div class="drawer-card-actions">
              <ion-button type="button" (click)="saveEdit()">Save</ion-button>
              <ion-button [fill]="'outline'" type="button" (click)="cancelEdit()">Cancel</ion-button>
            </div>
          </form>
        </ion-card>
      </div>
    </ng-container>
  `,
  styleUrls: [ './container.scss' ],
})
export class ManagedContentEditorContainer implements OnInit
{
  @ViewChild('contentValueInput') public contentValueInput!: IonTextarea
  private _cssAnimatingOut = new ReplaySubject<boolean>(1)
  public maybeFormGroup = this._editorService.activeContentControl
  public maybeFormControl = this.maybeFormGroup.pipe(
    map((formGroupOrUndefined) => formGroupOrUndefined?.get('value'))
  )
  public cssAnimatingOut = this._cssAnimatingOut.pipe(
    startWith(false),
    throttleTime(ANIMATION_DURATION_MS),
    switchMap((isAnimating) => isAnimating
      ? merge(
        of(isAnimating),
        of(false).pipe(
          delay(ANIMATION_DURATION_MS),
          tap(() => this._editorService.cancel()),
        ),
      )
      : of(isAnimating)
    ),
  )

  constructor(
    private _editorService: ManagedContentEditorService
  )
  { }

  public ngOnInit(): void
  {
    this.maybeFormGroup.subscribe(() =>
    {
      setTimeout(
        () => this.contentValueInput.setFocus(),
        100,
      )
    })
    this.maybeFormControl.subscribe(console.log)
  }

  public animateOut(): void
  {
    this._cssAnimatingOut.next(true)
  }

  public async saveEdit(): Promise<void>
  {
    await this._editorService.save()
  }

  public async cancelEdit(): Promise<void>
  {
    this.animateOut()
  }
}
