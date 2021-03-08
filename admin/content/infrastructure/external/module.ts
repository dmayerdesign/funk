import { CommonModule } from "@angular/common"
import { ModuleWithProviders, NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { CKEditorModule } from "@ckeditor/ckeditor5-angular"
import { construct as constructCancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { construct as constructGetHasPreview } from "@funk/admin/content/application/external/editor/behaviors/get-has-preview"
import { construct as constructGetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { construct as constructGetIsSaving } from "@funk/admin/content/application/external/editor/behaviors/get-is-saving"
import { construct as constructGetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { construct as constructGetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { construct as constructGetMaybeActiveContentType } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { construct as constructGetMaybeActiveContentValue } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { construct as constructGetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { construct as constructGetMaybeContentPreviews } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-content-previews"
import { construct as constructGetMaybePreviewOrLiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import { construct as constructGetPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
import { construct as constructOpenEditor } from "@funk/admin/content/application/external/editor/behaviors/open-editor"
import { construct as constructPublishAll } from "@funk/admin/content/application/external/editor/behaviors/publish-all"
import { construct as constructPublishAllOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { construct as constructPublishAndDeleteContentPreview } from "@funk/admin/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { construct as constructPublishOne } from "@funk/admin/content/application/external/editor/behaviors/publish-one"
import { construct as constructPublishOrReportConflict } from "@funk/admin/content/application/external/editor/behaviors/publish-or-report-conflict"
import { construct as constructRemoveAllPreviews } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews"
import { construct as constructRemoveAllPreviewsOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { construct as constructRemoveFromPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/remove-from-publish-conflicts"
import { construct as constructRemovePreview } from "@funk/admin/content/application/external/editor/behaviors/remove-preview"
import { construct as constructSaveAndClearIfEditing } from "@funk/admin/content/application/external/editor/behaviors/save-and-clear-if-editing"
import { ContentComponent } from "@funk/admin/content/infrastructure/external/component"
import { ContentEditorContainer } from "@funk/admin/content/infrastructure/external/editor/container"
import {
  CANCEL_EDIT,
  GET_HAS_PREVIEW,
  GET_IS_AUTHORIZED,
  GET_IS_SAVING,
  GET_MAYBE_ACTIVE_CONTENT,
  GET_MAYBE_ACTIVE_CONTENT_ID,
  GET_MAYBE_ACTIVE_CONTENT_TYPE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE,
  GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
  GET_MAYBE_CONTENT_PREVIEWS,
  GET_MAYBE_PREVIEW_OR_LIVE_CONTENT,
  GET_PUBLISH_CONFLICTS,
  OPEN_EDITOR,
  PUBLISH_ALL,
  PUBLISH_ALL_ON_CONFIRMATION,
  PUBLISH_AND_DELETE_CONTENT_PREVIEW,
  PUBLISH_ONE,
  PUBLISH_OR_REPORT_CONFLICT,
  REMOVE_ALL_PREVIEWS,
  REMOVE_ALL_PREVIEWS_ON_CONFIRMATION,
  REMOVE_FROM_PUBLISH_CONFLICTS,
  REMOVE_PREVIEW,
  SAVE_AND_CLEAR_IF_EDITING,
} from "@funk/admin/content/infrastructure/external/editor/tokens"
import { ContentPersistenceModule } from "@funk/admin/content/infrastructure/external/persistence/module"
import {
  GET_CONTENT_BY_ID,
  LISTEN_FOR_CONTENT_BY_ID,
  SET_CONTENT_BY_ID,
} from "@funk/admin/content/infrastructure/external/persistence/tokens"
import { DOM_GET_INNER_TEXT } from "@funk/admin/content/infrastructure/external/tokens"
import { ContentPreviewPersistenceModule } from "@funk/admin/content/preview/infrastructure/external/persistence/module"
import {
  DELETE_CONTENT_PREVIEW_BY_ID,
  LISTEN_FOR_CONTENT_PREVIEW_BY_ID,
  UPDATE_CONTENT_PREVIEW_BY_ID,
} from "@funk/admin/content/preview/infrastructure/external/persistence/tokens"
import { USER_SESSION } from "@funk/identity/infrastructure/external/tokens"
import {
  GET_USER_STATE_BY_ID,
  LISTEN_FOR_USER_STATE_BY_ID,
  UPDATE_USER_STATE_BY_ID,
} from "@funk/identity/user-state/infrastructure/external/persistence/tokens"
import { DEVICE_WIDTH } from "@funk/ui/infrastructure/external/tokens"
import { AlertController, IonicModule } from "@ionic/angular"
import { ClickOutsideModule } from "ng-click-outside"

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ClickOutsideModule,
    CKEditorModule,
    ContentPreviewPersistenceModule.withProviders(),
    ContentPersistenceModule.withProviders(),
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
          deps: [USER_SESSION, LISTEN_FOR_USER_STATE_BY_ID],
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
          provide: GET_MAYBE_ACTIVE_CONTENT,
          useFactory: constructGetMaybeActiveContent,
          deps: [
            GET_MAYBE_ACTIVE_CONTENT_ID,
            GET_MAYBE_PREVIEW_OR_LIVE_CONTENT,
          ],
        },
        {
          provide: GET_MAYBE_CONTENT_PREVIEWS,
          useFactory: constructGetMaybeContentPreviews,
          deps: [GET_USER_STATE_BY_ID],
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
          provide: PUBLISH_ALL,
          useFactory: constructPublishAll,
          deps: [PUBLISH_OR_REPORT_CONFLICT],
        },
        {
          provide: PUBLISH_ALL_ON_CONFIRMATION,
          useFactory: constructPublishAllOnConfirmation,
          deps: [
            USER_SESSION,
            AlertController,
            GET_MAYBE_CONTENT_PREVIEWS,
            PUBLISH_ALL,
          ],
        },
        {
          provide: PUBLISH_AND_DELETE_CONTENT_PREVIEW,
          useFactory: constructPublishAndDeleteContentPreview,
          deps: [
            SET_CONTENT_BY_ID,
            DELETE_CONTENT_PREVIEW_BY_ID,
            GET_MAYBE_CONTENT_PREVIEWS,
          ],
        },
        {
          provide: PUBLISH_ONE,
          useFactory: constructPublishOne,
          deps: [
            USER_SESSION,
            PUBLISH_AND_DELETE_CONTENT_PREVIEW,
            REMOVE_FROM_PUBLISH_CONFLICTS,
          ],
        },
        {
          provide: PUBLISH_OR_REPORT_CONFLICT,
          useFactory: constructPublishOrReportConflict,
          deps: [
            PUBLISH_AND_DELETE_CONTENT_PREVIEW,
            GET_CONTENT_BY_ID,
            GET_PUBLISH_CONFLICTS,
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
          deps: [UPDATE_USER_STATE_BY_ID, USER_SESSION, GET_PUBLISH_CONFLICTS],
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
          provide: SAVE_AND_CLEAR_IF_EDITING,
          useFactory: constructSaveAndClearIfEditing,
          deps: [
            GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL,
            GET_IS_SAVING,
            GET_MAYBE_ACTIVE_CONTENT,
            GET_MAYBE_ACTIVE_CONTENT_ID,
            GET_MAYBE_ACTIVE_CONTENT_VALUE,
            DOM_GET_INNER_TEXT,
            UPDATE_CONTENT_PREVIEW_BY_ID,
            CANCEL_EDIT,
          ],
        },
      ],
    }
  }
}
