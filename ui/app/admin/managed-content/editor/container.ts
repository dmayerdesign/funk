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
        You are looking at a preview
        <button (click)="maybeSaveAndPublish()">Publish</button>
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

        <ion-card class="flat full-width">
          <div id="editor-container">
            <ckeditor
              [config]="{ toolbar: editorToolbarConfig | async }"
              [editor]="editor"
              [formControl]="maybeFormControl | async">
            </ckeditor>
          </div>
          <div id="editor-actions"
            class="drawer-card-actions">
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
      "fontSize",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "bulletedList",
      "numberedList",
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
  {
    console.log("toolbar", new ClassicEditor())
  }

  public saveEdit = async (): Promise<void> =>
    await this._editorService.saveAndClearIfEditing()

  public cancelEdit = async (): Promise<void> =>
  {
    this._editorService.cancel()
  }

  public maybeSaveAndPublish = async (): Promise<void> =>
  {
    await this.saveEdit()
    await this._editorService.maybePublishAll()
  }
}
