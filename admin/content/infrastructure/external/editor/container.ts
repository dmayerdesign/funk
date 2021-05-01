import {
  Component,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core"
import { FormControl } from "@angular/forms"
import { CancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { GetHasPreview } from "@funk/admin/content/application/external/editor/behaviors/get-has-preview"
import { GetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentType } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { GetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { PublishAllOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { RemoveAllPreviewsOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { SaveAndClearIfEditing } from "@funk/admin/content/application/external/editor/behaviors/save-and-clear-if-editing"
import { ContentType } from "@funk/admin/content/model/content"
import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { IonTextarea } from "@ionic/angular"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { of } from "rxjs"
import { delay, map, switchMap } from "rxjs/operators"
import * as ClassicEditor from "ui/plugins/external/lib/rich-text/build/ckeditor"
import {
  CANCEL_EDIT,
  GET_HAS_PREVIEW,
  GET_IS_AUTHORIZED,
  GET_MAYBE_ACTIVE_CONTENT_TYPE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
  PUBLISH_ALL_ON_CONFIRMATION,
  REMOVE_ALL_PREVIEWS_ON_CONFIRMATION,
  SAVE_AND_CLEAR_IF_EDITING,
} from "./tokens"

const ANIMATION_DURATION_MS = 500

@UntilDestroy()
@Component({
  selector: "content-editor",
  template: `
    <div
      id="content-editor-wrapper"
      [ngClass]="{
        'has-preview': hasPreview | async,
        'admin-edit-mode-is-on': isActivated | async,
        'content-drawer-is-open': formControlIsVisible | async
      }"
    >
      <div *ngIf="hasPreview | async" id="has-preview-notice">
        <p id="has-preview-message">You are looking at a preview.</p>

        <div id="has-preview-actions">
          <div class="has-preview-action">
            <ion-button
              class="button"
              [style.font-size]="'11px'"
              size="small"
              color="primary"
              (click)="maybeSaveAndPublish()"
            >
              Publish changes
            </ion-button>
          </div>
          <div class="has-preview-action">
            <ion-button
              class="button"
              [style.font-size]="'11px'"
              size="small"
              color="danger"
              (click)="discardChanges()"
            >
              Discard changes
            </ion-button>
          </div>
        </div>
      </div>
      <ng-content></ng-content>
    </div>
    <ng-container *ngIf="formControlIsVisible | async">
      <div
        id="content-editor-drawer"
        [ngClass]="{
          'animate-out': !(maybeFormControl | async),
          'animate-in': maybeFormControl | async
        }"
        (clickOutside)="cancelEdit()"
        [exclude]="'.ck-body-wrapper *'"
        [excludeBeforeClick]="true"
      >
        <ion-card class="card flat flat-with-shadow">
          <div id="editor-container" *ngIf="formControl">
            <ckeditor
              [config]="{ toolbar: editorToolbarConfig | async }"
              [editor]="editor"
              [formControl]="formControl"
            >
            </ckeditor>
          </div>
          <div id="editor-actions" class="drawer-card-actions">
            <div class="drawer-card-action">
              <ion-button
                class="button"
                buttonType="button"
                color="dark"
                expand="full"
                (click)="saveAndClearIfEditing()"
              >
                Save
              </ion-button>
            </div>
            <div class="drawer-card-action">
              <ion-button
                class="button"
                buttonType="button"
                color="danger"
                expand="full"
                (click)="cancelEdit()"
              >
                Cancel
              </ion-button>
            </div>
          </div>
        </ion-card>
      </div>
    </ng-container>
  `,
  styleUrls: ["./container.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ContentEditorContainer implements OnInit {
  @ViewChild("contentValueInput") public contentValueInput!: IonTextarea
  public maybeFormControl = this._getMaybeActiveContentValueControl().pipe(
    untilDestroyed(this),
  )
  public formControl!: FormControl
  public hasPreview = this._getHasPreview().pipe(untilDestroyed(this))
  public formControlIsVisible = this.maybeFormControl.pipe(
    switchMap((formControl) =>
      !formControl
        ? of(!!formControl).pipe(delay(ANIMATION_DURATION_MS))
        : of(!!formControl),
    ),
    shareReplayOnce(),
    untilDestroyed(this),
  )
  public isActivated = this._getIsAuthorized().pipe(untilDestroyed(this))
  public editorToolbarConfig = this._getMaybeActiveContentType().pipe(
    map((type) => {
      switch (type) {
        case ContentType.TEXT:
          return this.editorToolbarConfigForPlaintext
        default:
          return this.editorToolbarConfigForHtml
      }
    }),
    shareReplayOnce(),
    untilDestroyed(this),
  )

  public readonly editor = ClassicEditor
  public readonly editorToolbarConfigForPlaintext: { items: string[] } = {
    items: [],
  }
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
    @Inject(SAVE_AND_CLEAR_IF_EDITING)
    public saveAndClearIfEditing: SaveAndClearIfEditing,

    @Inject(CANCEL_EDIT)
    private _cancelEdit: CancelEdit,

    @Inject(PUBLISH_ALL_ON_CONFIRMATION)
    private _publishAllOnConfirmation: PublishAllOnConfirmation,

    @Inject(REMOVE_ALL_PREVIEWS_ON_CONFIRMATION)
    private _removeAllPreviewsOnConfirmation: RemoveAllPreviewsOnConfirmation,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL)
    private _getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,

    @Inject(GET_HAS_PREVIEW)
    private _getHasPreview: GetHasPreview,

    @Inject(GET_IS_AUTHORIZED)
    private _getIsAuthorized: GetIsAuthorized,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_TYPE)
    private _getMaybeActiveContentType: GetMaybeActiveContentType,
  ) {}

  public ngOnInit(): void {
    this.maybeFormControl.pipe(ignoreNullish()).subscribe((formControl) => {
      this.formControl = formControl
    })
  }

  public async cancelEdit(): Promise<void> {
    this._cancelEdit()
  }

  public async maybeSaveAndPublish(): Promise<void> {
    await this.saveAndClearIfEditing()
    await this._publishAllOnConfirmation()
  }

  public async discardChanges(): Promise<void> {
    await this._removeAllPreviewsOnConfirmation()
  }
}
