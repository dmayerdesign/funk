import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core"
import { FormControl } from "@angular/forms"
import { CancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { GetHasPreview } from "@funk/admin/content/application/external/editor/behaviors/get-has-preview"
import { GetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentTitleControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-title-control"
import { GetMaybeActiveContentType } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { GetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { PublishAllOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { PublishOneOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/publish-one-on-confirmation"
import { RemoveAllPreviewsOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { SaveAndClearIfEditing } from "@funk/admin/content/application/external/editor/behaviors/save-and-clear-if-editing"
import { SaveIfEditing } from "@funk/admin/content/application/external/editor/behaviors/save-if-editing"
import {
  CANCEL_EDIT,
  GET_HAS_PREVIEW,
  GET_IS_AUTHORIZED,
  GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL,
  GET_MAYBE_ACTIVE_CONTENT_TYPE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
  PUBLISH_ALL_ON_CONFIRMATION,
  PUBLISH_ONE_ON_CONFIRMATION,
  REMOVE_ALL_PREVIEWS_ON_CONFIRMATION,
  SAVE_AND_CLEAR_IF_EDITING,
  SAVE_IF_EDITING,
} from "@funk/admin/content/infrastructure/external/editor/tokens"
import { ContentType } from "@funk/admin/content/model/content"
import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { WINDOW } from "@funk/ui/infrastructure/external/tokens"
import { IonInput } from "@ionic/angular"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { combineLatest, of } from "rxjs"
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from "rxjs/operators"
import * as ClassicEditor from "ui/plugins/external/lib/rich-text/build/ckeditor"

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
        'simple-content-drawer-is-open': simpleContentDrawerIsVisible | async,
        'blog-post-drawer-is-open': blogPostDrawerIsVisible | async
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
    <ng-container *ngIf="simpleContentDrawerIsVisible | async">
      <div
        id="simple-editor-drawer"
        class="editor-drawer half-height"
        [ngClass]="{
          'animate-out': !(maybeValueFormControl | async),
          'animate-in': maybeValueFormControl | async
        }"
        (clickOutside)="cancelEdit()"
        [exclude]="'.ck-body-wrapper *, [role=dialog]'"
        [excludeBeforeClick]="true"
      >
        <ion-card class="card flat flat-with-shadow">
          <div id="editor-container" *ngIf="valueFormControl">
            <ckeditor
              [config]="{
                toolbar: editorToolbarConfig | async,
                placeholder: 'Start typing...'
              }"
              [editor]="editor"
              [formControl]="valueFormControl"
            >
            </ckeditor>
          </div>
          <div id="simple-editor-actions" class="drawer-card-actions">
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
    <ng-container *ngIf="blogPostDrawerIsVisible | async">
      <div
        id="blog-post-editor-drawer"
        class="editor-drawer full-height"
        [ngClass]="{
          'animate-out': !(maybeValueFormControl | async),
          'animate-in': maybeValueFormControl | async
        }"
      >
        <ion-card class="card flat flat-with-shadow">
          <div id="blog-post-editor-drawer-inner">
            <div id="blog-post-editor-top">
              <div
                id="blog-post-editor-title-container"
                *ngIf="titleFormControl"
              >
                <ion-input
                  #blogPostEditorTitleInput
                  id="blog-post-editor-title-input"
                  placeholder="Untitled Blog Post"
                  [formControl]="titleFormControl"
                ></ion-input>
              </div>
            </div>
            <div id="blog-post-editor-value-container" *ngIf="valueFormControl">
              <ckeditor
                [config]="{
                  toolbar: editorToolbarConfig | async,
                  placeholder: 'Start typing...'
                }"
                [editor]="editor"
                [formControl]="valueFormControl"
              >
              </ckeditor>
            </div>
            <div id="blog-post-editor-actions" class="drawer-card-actions">
              <div class="drawer-card-action">
                <ion-button
                  id="blog-post-editor-publish"
                  class="publish-button button"
                  buttonType="button"
                  size="default"
                  expand="block"
                  [disabled]="!valueFormControl.value"
                  (click)="publishBlogPost()"
                >
                  Publish
                </ion-button>
              </div>
              <div class="drawer-card-action">
                <ion-button
                  id="blog-post-editor-save-and-close"
                  class="save-and-cancel-button transparent button"
                  buttonType="button"
                  size="small"
                  (click)="saveAndClearIfEditing()"
                >
                  Save and Close
                </ion-button>
              </div>
            </div>
          </div>
          <ion-button
            id="blog-post-editor-close-button"
            class="button close-button"
            (click)="saveAndClearIfEditing()"
          >
            <ion-icon
              class="icon"
              lazy="true"
              slot="icon-only"
              name="close-outline"
            ></ion-icon>
          </ion-button>
        </ion-card>
      </div>
    </ng-container>
  `,
  styleUrls: ["./container.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ContentEditorContainer implements OnInit {
  @ViewChild("blogPostEditorTitleInput")
  public blogPostEditorTitleInput!: IonInput
  public maybeValueFormControl = this._getMaybeActiveContentValueControl().pipe(
    untilDestroyed(this),
  )
  public valueFormControl!: FormControl
  public maybeTitleFormControl = this._getMaybeActiveContentTitleControl().pipe(
    untilDestroyed(this),
  )
  public titleFormControl!: FormControl
  public hasPreview = this._getHasPreview().pipe(untilDestroyed(this))
  public simpleContentDrawerIsVisible = this._getMaybeActiveContentType().pipe(
    // Adding a delay so that `clickOutside` doesn't get confused.
    delay(10),
    switchMap((contentType) =>
      !contentType
        ? of(false).pipe(delay(ANIMATION_DURATION_MS))
        : contentType === ContentType.TEXT || contentType === ContentType.HTML
        ? of(true)
        : of(false),
    ),
    shareReplayOnce(),
    untilDestroyed(this),
  )
  public blogPostDrawerIsVisible = this._getMaybeActiveContentType().pipe(
    // Adding a delay so that `clickOutside` doesn't get confused.
    delay(10),
    switchMap((contentType) =>
      !contentType
        ? of(false).pipe(delay(ANIMATION_DURATION_MS))
        : contentType === ContentType.HTML_BLOG_POST
        ? of(true)
        : of(false),
    ),
    shareReplayOnce(),
    untilDestroyed(this),
  )
  public isActivated = this._getIsAuthorized().pipe(untilDestroyed(this))

  public readonly editorToolbarConfig = this._getMaybeActiveContentType().pipe(
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
    @Inject(SAVE_IF_EDITING)
    public saveIfEditing: SaveIfEditing,

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

    @Inject(GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL)
    private _getMaybeActiveContentTitleControl: GetMaybeActiveContentTitleControl,

    @Inject(PUBLISH_ONE_ON_CONFIRMATION)
    private _publishOneOnConfirmation: PublishOneOnConfirmation,

    @Inject(WINDOW)
    private _window: Window,

    private _elementRef: ElementRef,
  ) {}

  public ngOnInit(): void {
    this.maybeValueFormControl
      .pipe(ignoreNullish())
      .subscribe((formControl) => {
        this.valueFormControl = formControl
      })
    this.maybeTitleFormControl
      .pipe(ignoreNullish())
      .subscribe((formControl) => {
        this.titleFormControl = formControl
      })
    this._setUpAutoSaveForBlogPosts()
    this._setUpFocusTitleOnOpen()
  }

  public cancelEdit(): void {
    this.saveIfEditing().then(() => {
      this._cancelEdit()
    })
  }

  public async maybeSaveAndPublish(): Promise<void> {
    await this.saveAndClearIfEditing()
    await this._publishAllOnConfirmation()
  }

  public async discardChanges(): Promise<void> {
    await this._removeAllPreviewsOnConfirmation()
  }

  public async publishBlogPost(): Promise<void> {
    const published = await this._publishOneOnConfirmation()
    if (published) {
      this._window.location.reload()
    } else {
      this._cancelEdit()
    }
  }

  private _setUpAutoSaveForBlogPosts(): void {
    combineLatest([
      this._getMaybeActiveContentType().pipe(startWith(undefined)),
      this.maybeTitleFormControl.pipe(
        ignoreNullish(),
        switchMap((formControl) => formControl.valueChanges),
        startWith(undefined),
        distinctUntilChanged(),
      ),
      this.maybeValueFormControl.pipe(
        ignoreNullish(),
        switchMap((formControl) => formControl.valueChanges),
        startWith(undefined),
        distinctUntilChanged(),
      ),
    ])
      .pipe(
        untilDestroyed(this),
        filter(
          ([contentType, contentTitle, contentValue]) =>
            contentType === ContentType.HTML_BLOG_POST &&
            (contentTitle !== undefined || contentValue !== undefined),
        ),
        debounceTime(1000),
        switchMap(() => this.saveIfEditing()),
      )
      .subscribe()
  }

  private _setUpFocusTitleOnOpen(): void {
    combineLatest([this.maybeTitleFormControl, this.maybeValueFormControl])
      .pipe(
        filter(
          ([maybeTitleFormControl, maybeValueFormControl]) =>
            !!maybeTitleFormControl && !!maybeValueFormControl,
        ),
        delay(ANIMATION_DURATION_MS),
        untilDestroyed(this),
      )
      .subscribe(([maybeTitleFormControl, maybeValueFormControl]) => {
        try {
          if (!!maybeTitleFormControl?.value?.length) {
            this._getMaybeEditorInputElement()?.focus()
          } else if (!!maybeValueFormControl) {
            this.blogPostEditorTitleInput.setFocus()
          }
        } catch (error) {
          console.error(error)
        }
      })
  }

  private _getMaybeEditorInputElement(): HTMLInputElement | undefined {
    const getElement = (): HTMLInputElement | null =>
      this._elementRef.nativeElement.querySelector("[contenteditable]")
    return getElement() ?? undefined
  }
}
