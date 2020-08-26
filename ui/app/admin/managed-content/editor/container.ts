import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from "@angular/core"
import { ManagedContentType } from "@funk/model/managed-content/managed-content"
import {
  ManagedContentEditorService,
} from "@funk/ui/core/admin/managed-content/editor/service"
import { MANAGED_CONTENT_EDITOR_SERVICE } from "@funk/ui/app/admin/managed-content/tokens"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { IonTextarea } from "@ionic/angular"
import { of } from "rxjs"
import { delay, switchMap, map } from "rxjs/operators"
import * as ClassicEditor from "lib/ckeditor5/build/ckeditor"

const ANIMATION_DURATION_MS = 500

@Component({
  selector: "managed-content-editor",
  template: `
    <div id="managed-content-editor-wrapper"
      [ngClass]="{
        'has-preview': hasPreview | async,
        'admin-edit-mode-is-on': isActivated | async,
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
        (clickOutside)="cancelEdit()">

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
  public maybeFormControl = this._editorService.activeContentValueControl
  public hasPreview = this._editorService.hasPreview
  public formControlIsVisible = this.maybeFormControl.pipe(
    switchMap((formControl) => !formControl
      ? of(!!formControl).pipe(delay(ANIMATION_DURATION_MS))
      : of(!!formControl)),
    shareReplayOnce()
  )
  public isActivated = this._editorService.isActivated
  public editorToolbarConfig = this._editorService.activeContentType.pipe(
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
    @Inject(MANAGED_CONTENT_EDITOR_SERVICE)
    private _editorService: ManagedContentEditorService
  )
  { }

  public ngOnInit(): void
  { }

  public async saveEdit(): Promise<void>
  {
    await this._editorService.saveAndClearIfEditing()
  }

  public async cancelEdit(): Promise<void>
  {
    this._editorService.cancel()
  }

  public async maybeSaveAndPublish(): Promise<void>
  {
    await this.saveEdit()
    await this._editorService.maybePublishAll()
  }

  public async discardChanges(): Promise<void>
  {
    await this._editorService.maybeRemoveAllPreviews()
  }
}
