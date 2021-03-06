import { ModuleWithProviders, NgModule } from "@angular/core"
import { CKEditorModule } from "@ckeditor/ckeditor5-angular"
import { ADD_HTML_BLOG_POST_COVER_IMAGE } from "@funk/blog/infrastructure/external/tokens"
import { construct as constructCancelEdit } from "@funk/content/application/external/editor/behaviors/cancel-edit"
import { contentCache } from "@funk/content/application/external/editor/behaviors/content-cache"
import { construct as constructCreateCoverImagePreviewUrl } from "@funk/content/application/external/editor/behaviors/create-cover-image-preview-url"
import { construct as constructGetHasPreview } from "@funk/content/application/external/editor/behaviors/get-has-preview"
import { construct as constructGetIsAuthorized } from "@funk/content/application/external/editor/behaviors/get-is-authorized"
import { construct as constructGetIsSaving } from "@funk/content/application/external/editor/behaviors/get-is-saving"
import { construct as constructGetMaybeActiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content"
import { construct as constructGetMaybeActiveContentCoverImageGroup } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group"
import { construct as constructGetMaybeActiveContentCoverImageGroupControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group-control"
import { construct as constructGetMaybeActiveContentId } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { construct as constructGetMaybeActiveContentTitle } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title"
import { construct as constructGetMaybeActiveContentTitleControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title-control"
import { construct as constructGetMaybeActiveContentType } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { construct as constructGetMaybeActiveContentValue } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { construct as constructGetMaybeActiveContentValueControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { construct as constructGetMaybeContentPreviews } from "@funk/content/application/external/editor/behaviors/get-maybe-content-previews"
import { construct as constructGetMaybePreviewOrLiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import { construct as constructGetPublishConflicts } from "@funk/content/application/external/editor/behaviors/get-publish-conflicts"
import { construct as constructMoveContentToTrash } from "@funk/content/application/external/editor/behaviors/move-content-to-trash"
import { construct as constructOpenEditor } from "@funk/content/application/external/editor/behaviors/open-editor"
import { construct as constructOpenHtmlBlogPostEditor } from "@funk/content/application/external/editor/behaviors/open-html-blog-post-editor"
import { construct as constructPublishAllOnConfirmation } from "@funk/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { construct as constructPublishAllOrReportConflicts } from "@funk/content/application/external/editor/behaviors/publish-all-or-report-conflicts"
import { construct as constructPublishAndDeleteContentPreview } from "@funk/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { construct as constructPublishOneOnConfirmation } from "@funk/content/application/external/editor/behaviors/publish-one-on-confirmation"
import { construct as constructPublishOneOrReportConflict } from "@funk/content/application/external/editor/behaviors/publish-one-or-report-conflict"
import { construct as constructPublishOneOverride } from "@funk/content/application/external/editor/behaviors/publish-one-override"
import { construct as constructRemoveAllPreviews } from "@funk/content/application/external/editor/behaviors/remove-all-previews"
import { construct as constructRemoveAllPreviewsOnConfirmation } from "@funk/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { construct as constructRemoveFromPublishConflicts } from "@funk/content/application/external/editor/behaviors/remove-from-publish-conflicts"
import { construct as constructRemovePreview } from "@funk/content/application/external/editor/behaviors/remove-preview"
import { construct as constructSaveAndClearIfEditing } from "@funk/content/application/external/editor/behaviors/save-and-clear-if-editing"
import { construct as constructSaveIfEditing } from "@funk/content/application/external/editor/behaviors/save-if-editing"
import { ContentComponent } from "@funk/content/infrastructure/external/component"
import { ContentEditorContainer } from "@funk/content/infrastructure/external/editor/container"
import {
  CANCEL_EDIT,
  CONTENT_CACHE,
  CREATE_COVER_IMAGE_PREVIEW_URL,
  GET_HAS_PREVIEW,
  GET_IS_AUTHORIZED,
  GET_IS_SAVING,
  GET_MAYBE_ACTIVE_CONTENT,
  GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP,
  GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL,
  GET_MAYBE_ACTIVE_CONTENT_ID,
  GET_MAYBE_ACTIVE_CONTENT_TITLE,
  GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL,
  GET_MAYBE_ACTIVE_CONTENT_TYPE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
  GET_MAYBE_CONTENT_PREVIEWS,
  GET_MAYBE_PREVIEW_OR_LIVE_CONTENT,
  GET_PUBLISH_CONFLICTS,
  MOVE_CONTENT_TO_TRASH,
  OPEN_EDITOR,
  OPEN_HTML_BLOG_POST_EDITOR,
  PUBLISH_ALL_ON_CONFIRMATION,
  PUBLISH_ALL_OR_REPORT_CONFLICTS,
  PUBLISH_AND_DELETE_CONTENT_PREVIEW,
  PUBLISH_ONE_ON_CONFIRMATION,
  PUBLISH_ONE_OR_REPORT_CONFLICT,
  PUBLISH_ONE_OVERRIDE,
  REMOVE_ALL_PREVIEWS,
  REMOVE_ALL_PREVIEWS_ON_CONFIRMATION,
  REMOVE_FROM_PUBLISH_CONFLICTS,
  REMOVE_PREVIEW,
  SAVE_AND_CLEAR_IF_EDITING,
  SAVE_IF_EDITING,
} from "@funk/content/infrastructure/external/editor/tokens"
import { ContentPersistenceModule } from "@funk/content/infrastructure/external/persistence/module"
import {
  GET_CONTENT_BY_ID,
  LISTEN_FOR_CONTENT_BY_ID,
  SET_CONTENT_BY_ID,
  UPDATE_CONTENT_BY_ID,
} from "@funk/content/infrastructure/external/persistence/tokens"
import { DOM_GET_INNER_TEXT } from "@funk/content/infrastructure/external/tokens"
import { ContentPreviewPersistenceModule } from "@funk/content/preview/infrastructure/external/persistence/module"
import {
  DELETE_CONTENT_PREVIEW_BY_ID,
  GET_CONTENT_PREVIEW_BY_ID,
  LISTEN_FOR_CONTENT_PREVIEW_BY_ID,
  SET_CONTENT_PREVIEW_BY_ID,
  UPDATE_CONTENT_PREVIEW_BY_ID,
} from "@funk/content/preview/infrastructure/external/persistence/tokens"
import {
  USER_CONTENT,
  USER_SESSION,
} from "@funk/identity/infrastructure/external/tokens"
import {
  GET_USER_CONTENT_BY_ID,
  LISTEN_FOR_USER_CONTENT_BY_ID,
  UPDATE_USER_CONTENT_BY_ID,
} from "@funk/identity/user-content/infrastructure/external/persistence/tokens"
import { ImageStorageModule } from "@funk/storage/plugins/external/image-storage/module"
import { AppCommonModule } from "@funk/ui/infrastructure/external/common.module"
import { DEVICE_WIDTH } from "@funk/ui/infrastructure/external/tokens"
import { AlertController } from "@ionic/angular"
import { ClickOutsideModule } from "ng-click-outside"

@NgModule({
  imports: [
    AppCommonModule,
    ClickOutsideModule,
    CKEditorModule,
    ContentPreviewPersistenceModule.withProviders(),
    ContentPersistenceModule.withProviders(),
    ImageStorageModule,
  ],
  declarations: [ContentEditorContainer, ContentComponent],
  exports: [ContentEditorContainer, ContentComponent],
})
export class ContentModule {
  public static withProviders(): ModuleWithProviders<ContentModule> {
    return {
      ngModule: ContentModule,
      providers: [
        {
          provide: CANCEL_EDIT,
          useFactory: constructCancelEdit,
          deps: [GET_MAYBE_ACTIVE_CONTENT_ID],
        },
        {
          provide: GET_HAS_PREVIEW,
          useFactory: constructGetHasPreview,
          deps: [USER_SESSION, LISTEN_FOR_USER_CONTENT_BY_ID],
        },
        {
          provide: GET_IS_AUTHORIZED,
          useFactory: constructGetIsAuthorized,
          deps: [USER_SESSION, DEVICE_WIDTH],
        },
        {
          provide: GET_IS_SAVING,
          useFactory: constructGetIsSaving,
          deps: [],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_ID,
          useFactory: constructGetMaybeActiveContentId,
          deps: [],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT,
          useFactory: constructGetMaybeActiveContent,
          deps: [
            GET_MAYBE_ACTIVE_CONTENT_ID,
            GET_MAYBE_PREVIEW_OR_LIVE_CONTENT,
          ],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_TYPE,
          useFactory: constructGetMaybeActiveContentType,
          deps: [GET_MAYBE_ACTIVE_CONTENT],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
          useFactory: constructGetMaybeActiveContentValueControl,
          deps: [GET_MAYBE_ACTIVE_CONTENT],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_VALUE,
          useFactory: constructGetMaybeActiveContentValue,
          deps: [GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL,
          useFactory: constructGetMaybeActiveContentTitleControl,
          deps: [GET_MAYBE_ACTIVE_CONTENT],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_TITLE,
          useFactory: constructGetMaybeActiveContentTitle,
          deps: [GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL,
          useFactory: constructGetMaybeActiveContentCoverImageGroupControl,
          deps: [GET_MAYBE_ACTIVE_CONTENT],
        },
        {
          provide: GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP,
          useFactory: constructGetMaybeActiveContentCoverImageGroup,
          deps: [GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL],
        },
        {
          provide: GET_MAYBE_CONTENT_PREVIEWS,
          useFactory: constructGetMaybeContentPreviews,
          deps: [GET_USER_CONTENT_BY_ID],
        },
        {
          provide: GET_MAYBE_PREVIEW_OR_LIVE_CONTENT,
          useFactory: constructGetMaybePreviewOrLiveContent,
          deps: [LISTEN_FOR_CONTENT_PREVIEW_BY_ID, LISTEN_FOR_CONTENT_BY_ID],
        },
        {
          provide: GET_PUBLISH_CONFLICTS,
          useFactory: constructGetPublishConflicts,
          deps: [],
        },
        {
          provide: OPEN_EDITOR,
          useFactory: constructOpenEditor,
          deps: [GET_MAYBE_ACTIVE_CONTENT_ID, GET_IS_AUTHORIZED],
        },
        {
          provide: OPEN_HTML_BLOG_POST_EDITOR,
          useFactory: constructOpenHtmlBlogPostEditor,
          deps: [
            GET_MAYBE_ACTIVE_CONTENT_ID,
            GET_IS_AUTHORIZED,
            SET_CONTENT_PREVIEW_BY_ID,
            GET_CONTENT_BY_ID,
            USER_CONTENT,
          ],
        },
        {
          provide: PUBLISH_ALL_OR_REPORT_CONFLICTS,
          useFactory: constructPublishAllOrReportConflicts,
          deps: [PUBLISH_ONE_OR_REPORT_CONFLICT],
        },
        {
          provide: PUBLISH_ALL_ON_CONFIRMATION,
          useFactory: constructPublishAllOnConfirmation,
          deps: [
            USER_SESSION,
            AlertController,
            GET_MAYBE_CONTENT_PREVIEWS,
            PUBLISH_ALL_OR_REPORT_CONFLICTS,
          ],
        },
        {
          provide: PUBLISH_ONE_ON_CONFIRMATION,
          useFactory: constructPublishOneOnConfirmation,
          deps: [
            USER_SESSION,
            AlertController,
            PUBLISH_ONE_OR_REPORT_CONFLICT,
            GET_MAYBE_ACTIVE_CONTENT_ID,
          ],
        },
        {
          provide: PUBLISH_AND_DELETE_CONTENT_PREVIEW,
          useFactory: constructPublishAndDeleteContentPreview,
          deps: [
            SET_CONTENT_BY_ID,
            DELETE_CONTENT_PREVIEW_BY_ID,
            GET_MAYBE_CONTENT_PREVIEWS,
            SAVE_IF_EDITING,
          ],
        },
        {
          provide: PUBLISH_ONE_OVERRIDE,
          useFactory: constructPublishOneOverride,
          deps: [
            USER_SESSION,
            PUBLISH_AND_DELETE_CONTENT_PREVIEW,
            REMOVE_FROM_PUBLISH_CONFLICTS,
          ],
        },
        {
          provide: PUBLISH_ONE_OR_REPORT_CONFLICT,
          useFactory: constructPublishOneOrReportConflict,
          deps: [
            PUBLISH_AND_DELETE_CONTENT_PREVIEW,
            GET_CONTENT_BY_ID,
            GET_PUBLISH_CONFLICTS,
            GET_CONTENT_PREVIEW_BY_ID,
          ],
        },
        {
          provide: REMOVE_ALL_PREVIEWS_ON_CONFIRMATION,
          useFactory: constructRemoveAllPreviewsOnConfirmation,
          deps: [AlertController, REMOVE_ALL_PREVIEWS],
        },
        {
          provide: REMOVE_ALL_PREVIEWS,
          useFactory: constructRemoveAllPreviews,
          deps: [
            UPDATE_USER_CONTENT_BY_ID,
            USER_SESSION,
            GET_PUBLISH_CONFLICTS,
          ],
        },
        {
          provide: REMOVE_FROM_PUBLISH_CONFLICTS,
          useFactory: constructRemoveFromPublishConflicts,
          deps: [GET_PUBLISH_CONFLICTS],
        },
        {
          provide: REMOVE_PREVIEW,
          useFactory: constructRemovePreview,
          deps: [DELETE_CONTENT_PREVIEW_BY_ID, REMOVE_FROM_PUBLISH_CONFLICTS],
        },
        {
          provide: SAVE_IF_EDITING,
          useFactory: constructSaveIfEditing,
          deps: [
            GET_IS_SAVING,
            GET_MAYBE_ACTIVE_CONTENT,
            GET_MAYBE_ACTIVE_CONTENT_ID,
            GET_MAYBE_ACTIVE_CONTENT_VALUE,
            GET_MAYBE_ACTIVE_CONTENT_TITLE,
            GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP,
            DOM_GET_INNER_TEXT,
            UPDATE_CONTENT_PREVIEW_BY_ID,
            ADD_HTML_BLOG_POST_COVER_IMAGE,
          ],
        },
        {
          provide: SAVE_AND_CLEAR_IF_EDITING,
          useFactory: constructSaveAndClearIfEditing,
          deps: [SAVE_IF_EDITING, CANCEL_EDIT],
        },
        {
          provide: MOVE_CONTENT_TO_TRASH,
          useFactory: constructMoveContentToTrash,
          deps: [UPDATE_CONTENT_BY_ID],
        },
        {
          provide: CREATE_COVER_IMAGE_PREVIEW_URL,
          useFactory: constructCreateCoverImagePreviewUrl,
          deps: [],
        },
        {
          provide: CONTENT_CACHE,
          useValue: contentCache,
        },
      ],
    }
  }
}
