import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from "@angular/core"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { ManagedContentType } from "@funk/model/managed-content/managed-content"
import { CANCEL_EDIT, GET_HAS_PREVIEW, GET_IS_AUTHORIZED, GET_MAYBE_ACTIVE_CONTENT_TYPE, GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL, PUBLISH_ALL_ON_CONFIRMATION, REMOVE_ALL_PREVIEWS_ON_CONFIRMATION, SAVE_AND_CLEAR_IF_EDITING } from "@funk/ui/app/admin/managed-content/tokens"
import { CancelEdit } from '@funk/ui/core/admin/managed-content/editor/behaviors/cancel-edit'
import { GetHasPreview } from '@funk/ui/core/admin/managed-content/editor/behaviors/get-has-preview'
import { GetIsAuthorized } from '@funk/ui/core/admin/managed-content/editor/behaviors/get-is-authorized'
import { GetMaybeActiveContentType } from '@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-type'
import { GetMaybeActiveContentValueControl } from '@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-value-control'
import { PublishAllOnConfirmation } from '@funk/ui/core/admin/managed-content/editor/behaviors/publish-all-on-confirmation'
import { RemoveAllPreviewsOnConfirmation } from '@funk/ui/core/admin/managed-content/editor/behaviors/remove-all-previews-on-confirmation'
import { SaveAndClearIfEditing } from '@funk/ui/core/admin/managed-content/editor/behaviors/save-and-clear-if-editing'
import { IonTextarea } from "@ionic/angular"
import * as ClassicEditor from "lib/ckeditor5/build/ckeditor"
import { of } from "rxjs"
import { delay, map, switchMap } from "rxjs/operators"

const ANIMATION_DURATION_MS = 500

@Component({
  selector: "managed-content-editor",
  template: `
    <div id="managed-content-editor-wrapper"
      [ngClass]="{
        'has-preview': hasPreview | async,
        'admin-edit-mode-is-on': isAuthorized | async,
        'content-drawer-is-open': formControlIsVisible | async
      }">
      <div *ngIf="hasPreview | async"
        id="has-preview-notice">

        <p id="has-preview-message">You are looking at a preview.</p>

        <div id="has-preview-actions">
          <div class="has-preview-action">
            <ion-button
              [style.font-size]="'11px'"
              size="small"
              color="primary"
              (click)="maybeSaveAndPublish()">
              Publish changes
            </ion-button>
          </div>
          <div class="has-preview-action">
            <ion-button
              [style.font-size]="'11px'"
              size="small"
              color="danger"
              (click)="discardChanges()">
              Discard changes
            </ion-button>
          </div>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-container *ngIf="formControlIsVisible | async">
      <div
        id="managed-content-editor-drawer"
        [ngClass]="{
          'animate-out': !(maybeFormControl | async),
          'animate-in': maybeFormControl | async
        }"
        (clickOutside)="cancelEdit()"
        [exclude]="'.ck-body-wrapper *'"
        [excludeBeforeClick]="true">

        <ion-card class="flat flat-with-shadow">
          <div id="editor-container">
            <ckeditor
              [config]="{ toolbar: editorToolbarConfig | async }"
              [editor]="editor"
              [formControl]="maybeFormControl | async">
            </ckeditor>
          </div>
          <div id="editor-actions"
            class="drawer-card-actions">
            <div class="drawer-card-action">
              <ion-button
                buttonType="button"
                color="dark"
                expand="full"
                (click)="saveEdit()">
                Save
              </ion-button>
            </div>
            <div class="drawer-card-action">
              <ion-button
                buttonType="button"
                color="danger"
                expand="full"
                (click)="cancelEdit()">
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-card>
      </div>
    </ng-container>
  `,
  styleUrls: [ "./container.scss" ],
  encapsulation: ViewEncapsulation.None,
})
export class ManagedContentEditorContainer implements OnInit
{
  @ViewChild("contentValueInput") public contentValueInput!: IonTextarea
  public maybeFormControl = this.getMaybeActiveContentValueControl()
  public hasPreview = this.getHasPreview()
  public formControlIsVisible = this.maybeFormControl.pipe(
    switchMap((formControl) => !formControl
      ? of(!!formControl).pipe(delay(ANIMATION_DURATION_MS))
      : of(!!formControl)),
    shareReplayOnce()
  )
  public isAuthorized = this.getIsAuthorized()
  public editorToolbarConfig = this.getMaybeActiveContentType().pipe(
    map((type) =>
    {
      switch(type)
      {
        case ManagedContentType.TEXT: return this.editorToolbarConfigForPlaintext
        default: return this.editorToolbarConfigForHtml
      }
    })
  )

  public readonly editor = ClassicEditor
  public readonly editorToolbarConfigForPlaintext: { items: string[] } = { items: [] }
  public readonly editorToolbarConfigForHtml: { items: string[] } = {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "bulletedList",
      "numberedList",
      "|",
      "fontSize",
      "superscript",
      "subscript",
      "fontColor",
      "|",
      "indent",
      "outdent",
      "|",
      "link",
      "imageUpload",
      "blockQuote",
      "mediaEmbed",
      "horizontalLine",
      "undo",
      "redo",
    ],
  }

  public constructor(
    @Inject(GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL) public getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,
    @Inject(GET_HAS_PREVIEW) public getHasPreview: GetHasPreview,
    @Inject(GET_IS_AUTHORIZED) public getIsAuthorized: GetIsAuthorized,
    @Inject(GET_MAYBE_ACTIVE_CONTENT_TYPE) public getMaybeActiveContentType: GetMaybeActiveContentType,
    @Inject(SAVE_AND_CLEAR_IF_EDITING) public saveAndClearIfEditing: SaveAndClearIfEditing,
    @Inject(CANCEL_EDIT) public cancelEdit: CancelEdit,
    @Inject(PUBLISH_ALL_ON_CONFIRMATION) public publishAllOnConfirmation: PublishAllOnConfirmation,
    @Inject(REMOVE_ALL_PREVIEWS_ON_CONFIRMATION) public removeAllPreviewsOnConfirmation: RemoveAllPreviewsOnConfirmation
  )
  { }

  public ngOnInit(): void
  { }

  public async saveEdit(): Promise<void>
  {
    await this.saveAndClearIfEditing()
  }

  public async maybeSaveAndPublish(): Promise<void>
  {
    await this.saveEdit()
    await this.publishAllOnConfirmation()
  }

  public async discardChanges(): Promise<void>
  {
    await this.removeAllPreviewsOnConfirmation()
  }
}
