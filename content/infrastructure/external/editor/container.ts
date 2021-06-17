import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"
import { CancelEdit } from "@funk/content/application/external/editor/behaviors/cancel-edit"
import { CreateCoverImagePreviewUrl } from "@funk/content/application/external/editor/behaviors/create-cover-image-preview-url"
import { GetHasPreview } from "@funk/content/application/external/editor/behaviors/get-has-preview"
import { GetIsAuthorized } from "@funk/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentCoverImageGroup } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group"
import { GetMaybeActiveContentCoverImageGroupControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group-control"
import { GetMaybeActiveContentId } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentTitleControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title-control"
import { GetMaybeActiveContentType } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { GetMaybeActiveContentValueControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { MoveContentToTrash } from "@funk/content/application/external/editor/behaviors/move-content-to-trash"
import { PublishAllOnConfirmation } from "@funk/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { PublishOneOnConfirmation } from "@funk/content/application/external/editor/behaviors/publish-one-on-confirmation"
import { RemoveAllPreviewsOnConfirmation } from "@funk/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { SaveAndClearIfEditing } from "@funk/content/application/external/editor/behaviors/save-and-clear-if-editing"
import { SaveIfEditing } from "@funk/content/application/external/editor/behaviors/save-if-editing"
import {
  ImageGroup,
  IMAGE_GROUPS,
} from "@funk/content/image-group/model/image-group"
import {
  CANCEL_EDIT,
  CREATE_COVER_IMAGE_PREVIEW_URL,
  GET_HAS_PREVIEW,
  GET_IS_AUTHORIZED,
  GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP,
  GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL,
  GET_MAYBE_ACTIVE_CONTENT_ID,
  GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL,
  GET_MAYBE_ACTIVE_CONTENT_TYPE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
  MOVE_CONTENT_TO_TRASH,
  PUBLISH_ALL_ON_CONFIRMATION,
  PUBLISH_ONE_ON_CONFIRMATION,
  REMOVE_ALL_PREVIEWS_ON_CONFIRMATION,
  SAVE_AND_CLEAR_IF_EDITING,
  SAVE_IF_EDITING,
} from "@funk/content/infrastructure/external/editor/tokens"
import { ContentType } from "@funk/content/model/content"
import { asPromise } from "@funk/helpers/as-promise"
import { ignoreNullish, shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { UserContent$ } from "@funk/identity/application/external/user-content"
import { USER_CONTENT } from "@funk/identity/infrastructure/external/tokens"
import { ImageResolution } from "@funk/image/model/image-resolution"
import { DbDocumentInput } from "@funk/persistence/model/database-document"
import { UploadImage } from "@funk/storage/plugins/external/image-storage/behaviors/upload-image"
import { UPLOAD_IMAGE } from "@funk/storage/plugins/external/image-storage/tokens"
import { FileInputEvent } from "@funk/ui/infrastructure/external/helpers/dom/file-input-event"
import { WINDOW } from "@funk/ui/infrastructure/external/tokens"
import { AlertController, IonInput } from "@ionic/angular"
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
  withLatestFrom,
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
          <div id="editor-container" *ngIf="maybeValueFormControl | async">
            <ckeditor
              [config]="{
                toolbar: editorToolbarConfig | async,
                placeholder: 'Start typing...'
              }"
              [editor]="editor"
              [formControl]="valueFormControl | asyncNotNull"
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
              <div id="blog-post-editor-cover-image">
                <div
                  id="blog-post-editor-cover-image-preview"
                  [style.background-image]="
                    coverImagePreviewBackgroundImage | asyncNotNull
                  "
                ></div>
                <div
                  id="blog-post-editor-cover-image-input-container"
                  (click)="coverImageInput.click()"
                >
                  <input
                    #coverImageInput
                    id="blog-post-editor-cover-image-input"
                    type="file"
                    accept="image/jpeg,.jpg,.jpeg,image/png,.png,image/gif,.gif"
                    (change)="uploadNewCoverImage($event)"
                  />
                  <span
                    *ngIf="
                      coverImagePreviewBackgroundImageIsNone | asyncNotNull
                    "
                    class="uploader-drop-zone-text"
                  >
                    Add a cover image
                  </span>
                  <ng-container
                    *ngIf="
                      !(coverImagePreviewBackgroundImageIsNone | asyncNotNull)
                    "
                  >
                    <ion-button class="edit-button button">
                      <ion-icon
                        class="icon"
                        lazy="true"
                        slot="icon-only"
                        name="create-sharp"
                      ></ion-icon>
                    </ion-button>
                  </ng-container>
                </div>
              </div>
              <div
                id="blog-post-editor-title-container"
                *ngIf="blogPostDrawerIsVisible | async"
              >
                <ion-input
                  #blogPostEditorTitleInput
                  id="blog-post-editor-title-input"
                  placeholder="Untitled Blog Post"
                  [formControl]="titleFormControl | asyncNotNull"
                ></ion-input>
              </div>
            </div>
            <div
              id="blog-post-editor-value-container"
              *ngIf="blogPostDrawerIsVisible | async"
            >
              <ckeditor
                [config]="{
                  toolbar: editorToolbarConfig | async,
                  placeholder: 'Start typing...'
                }"
                [editor]="editor"
                [formControl]="valueFormControl | asyncNotNull"
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
                  [disabled]="!(maybeValueFormControl | async)?.value"
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
              <ng-container *ngIf="contentHasBeenPublished | async">
                <div class="remove-action drawer-card-action">
                  <ion-button
                    id="blog-post-editor-remove"
                    class="remove-button transparent button"
                    buttonType="button"
                    size="small"
                    (click)="removeActiveContentOnConfirmation()"
                  >
                    Move to Trash
                  </ion-button>
                </div>
              </ng-container>
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
})
export class ContentEditorContainer implements OnInit {
  @ViewChild("blogPostEditorTitleInput")
  public blogPostEditorTitleInput!: IonInput

  public maybeValueFormControl = this._getMaybeActiveContentValueControl().pipe(
    untilDestroyed(this),
  )
  public valueFormControl = this.maybeValueFormControl.pipe(ignoreNullish())
  public maybeTitleFormControl = this._getMaybeActiveContentTitleControl().pipe(
    untilDestroyed(this),
  )
  public titleFormControl = this.maybeTitleFormControl.pipe(ignoreNullish())
  public maybeCoverImageGroupFormControl = this._getMaybeActiveContentCoverImageGroupControl().pipe(
    untilDestroyed(this),
  )
  public coverImageGroupFormControl = this.maybeCoverImageGroupFormControl.pipe(
    ignoreNullish(),
    shareReplayOnce(),
  )
  private _maybeCoverImageGroup = this._getMaybeActiveContentCoverImageGroup().pipe(
    untilDestroyed(this),
  )
  public coverImagePreviewBackgroundImage = this._maybeCoverImageGroup.pipe(
    map((coverImageGroup) =>
      this.domSanitizer.bypassSecurityTrustStyle(
        !!coverImageGroup
          ? `url(${coverImageGroup.images[coverImageGroup.largeSize].url})`
          : "none",
      ),
    ),
    untilDestroyed(this),
  )
  public coverImagePreviewBackgroundImageIsNone = this._maybeCoverImageGroup.pipe(
    map((coverImageGroup) => !coverImageGroup),
  )
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
  public contentHasBeenPublished = this._userContent.pipe(
    ignoreNullish(),
    withLatestFrom(this._getMaybeActiveContentId()),
    map(
      ([{ contentPreviews }, contentId]) =>
        !contentPreviews?.[contentId!]?.isUnpublished,
    ),
    shareReplayOnce(),
    untilDestroyed(this),
  )

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

    @Inject(USER_CONTENT)
    private _userContent: UserContent$,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL)
    private _getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL)
    private _getMaybeActiveContentTitleControl: GetMaybeActiveContentTitleControl,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL)
    private _getMaybeActiveContentCoverImageGroupControl: GetMaybeActiveContentCoverImageGroupControl,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP)
    private _getMaybeActiveContentCoverImageGroup: GetMaybeActiveContentCoverImageGroup,

    @Inject(GET_HAS_PREVIEW)
    private _getHasPreview: GetHasPreview,

    @Inject(GET_IS_AUTHORIZED)
    private _getIsAuthorized: GetIsAuthorized,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_TYPE)
    private _getMaybeActiveContentType: GetMaybeActiveContentType,

    @Inject(PUBLISH_ONE_ON_CONFIRMATION)
    private _publishOneOnConfirmation: PublishOneOnConfirmation,

    @Inject(MOVE_CONTENT_TO_TRASH)
    private _moveContentToTrash: MoveContentToTrash,

    @Inject(GET_MAYBE_ACTIVE_CONTENT_ID)
    private _getMaybeActiveContentId: GetMaybeActiveContentId,

    @Inject(CREATE_COVER_IMAGE_PREVIEW_URL)
    private _createCoverImagePreviewUrl: CreateCoverImagePreviewUrl,

    @Inject(WINDOW)
    private _window: Window,

    @Inject(UPLOAD_IMAGE)
    private _uploadImage: UploadImage,

    private _elementRef: ElementRef<HTMLElement>,

    private _alertController: AlertController,

    public domSanitizer: DomSanitizer,
  ) {}

  public ngOnInit(): void {
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
    await this.saveIfEditing()
    const published = await this._publishOneOnConfirmation()
    if (published) {
      this._window.location.reload()
    } else {
      this._cancelEdit()
    }
  }

  public async removeActiveContentOnConfirmation(): Promise<boolean> {
    const activeContentId = await asPromise(this._getMaybeActiveContentId())
    return new Promise((resolve) => {
      // Do nothing if the user does not confirm.
      const CONFIRM_MESSAGE = "You're about to move this post to the trash."
      this._alertController
        .create({
          header: "Are you sure?",
          message: CONFIRM_MESSAGE,
          buttons: [
            {
              text: "No, Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: async () => {
                await this._alertController.dismiss()
                resolve(false)
              },
            },
            {
              text: "Yes, Move To Trash",
              cssClass: "",
              handler: async () => {
                await this._moveContentToTrash(activeContentId!)
                this._window.location.reload()
                resolve(true)
              },
            },
          ],
        })
        .then((confirmRemoveAll) => {
          confirmRemoveAll.present()
        })
    })
  }

  public async uploadNewCoverImage(event: Event): Promise<void> {
    const coverImageFileSystemUrl = await this._createCoverImagePreviewUrl(
      event,
    )
    const coverImageGroupFormControl = await asPromise(
      this.coverImageGroupFormControl,
    )
    const fileInputEvent = event as FileInputEvent
    const originalImage = await this._uploadImage(
      coverImageFileSystemUrl,
      `${IMAGE_GROUPS}/${fileInputEvent.target.files[0].name}`,
    )
    const newCoverImageResolution: ImageResolution = await new Promise(
      (resolve) => {
        const image = new Image()
        image.src = originalImage.url
        image.onload = function () {
          resolve({ width: image.width, height: image.height })
        }
      },
    )
    const originalSize = Math.max(
      newCoverImageResolution.width,
      newCoverImageResolution.height,
    )
    const initialCoverImageGroup: DbDocumentInput<ImageGroup> = {
      thumbnailSize: originalSize,
      largeSize: originalSize,
      originalSize,
      images: {
        [originalSize]: {
          url: originalImage.url,
        },
      },
    }
    coverImageGroupFormControl.setValue(initialCoverImageGroup)
  }

  private _setUpAutoSaveForBlogPosts(): void {
    combineLatest([
      this._getMaybeActiveContentType().pipe(startWith(undefined)),
      this.titleFormControl.pipe(
        switchMap((formControl) => formControl.valueChanges),
        startWith(undefined),
        distinctUntilChanged(),
      ),
      this.valueFormControl.pipe(
        switchMap((formControl) => formControl.valueChanges),
        startWith(undefined),
        distinctUntilChanged(),
      ),
      this.coverImageGroupFormControl.pipe(
        switchMap((formControl) => formControl.valueChanges),
        startWith(undefined),
        distinctUntilChanged(),
      ),
    ])
      .pipe(
        untilDestroyed(this),
        filter(
          ([type, title, value, coverImageGroup]) =>
            type === ContentType.HTML_BLOG_POST &&
            (title !== undefined ||
              value !== undefined ||
              coverImageGroup !== undefined),
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
