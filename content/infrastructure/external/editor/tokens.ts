import { InjectionToken } from "@angular/core"
import { CancelEdit } from "@funk/content/application/external/editor/behaviors/cancel-edit"
import { ContentCache } from "@funk/content/application/external/editor/behaviors/content-cache"
import { CreateCoverImagePreviewUrl } from "@funk/content/application/external/editor/behaviors/create-cover-image-preview-url"
import { GetHasPreview } from "@funk/content/application/external/editor/behaviors/get-has-preview"
import { GetIsAuthorized } from "@funk/content/application/external/editor/behaviors/get-is-authorized"
import { GetIsSaving } from "@funk/content/application/external/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentCoverImageGroup } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group"
import { GetMaybeActiveContentCoverImageGroupControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group-control"
import { GetMaybeActiveContentId } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentTitle } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title"
import { GetMaybeActiveContentTitleControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title-control"
import { GetMaybeActiveContentType } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { GetMaybeActiveContentValue } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { GetMaybeActiveContentValueControl } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { GetMaybeContentPreviews } from "@funk/content/application/external/editor/behaviors/get-maybe-content-previews"
import { GetMaybePreviewOrLiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import { GetPublishConflicts } from "@funk/content/application/external/editor/behaviors/get-publish-conflicts"
import { MoveContentToTrash } from "@funk/content/application/external/editor/behaviors/move-content-to-trash"
import { OpenEditor } from "@funk/content/application/external/editor/behaviors/open-editor"
import { OpenHtmlBlogPostEditor } from "@funk/content/application/external/editor/behaviors/open-html-blog-post-editor"
import { PublishAllOnConfirmation } from "@funk/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { PublishAllOrReportConflicts } from "@funk/content/application/external/editor/behaviors/publish-all-or-report-conflicts"
import { PublishAndDeleteContentPreview } from "@funk/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { PublishOneOnConfirmation } from "@funk/content/application/external/editor/behaviors/publish-one-on-confirmation"
import { PublishOneOrReportConflict } from "@funk/content/application/external/editor/behaviors/publish-one-or-report-conflict"
import { PublishOneOverride } from "@funk/content/application/external/editor/behaviors/publish-one-override"
import { RemoveAllPreviews } from "@funk/content/application/external/editor/behaviors/remove-all-previews"
import { RemoveAllPreviewsOnConfirmation } from "@funk/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { RemoveFromPublishConflicts } from "@funk/content/application/external/editor/behaviors/remove-from-publish-conflicts"
import { RemovePreview } from "@funk/content/application/external/editor/behaviors/remove-preview"
import { SaveAndClearIfEditing } from "@funk/content/application/external/editor/behaviors/save-and-clear-if-editing"
import { SaveIfEditing } from "@funk/content/application/external/editor/behaviors/save-if-editing"

export const CANCEL_EDIT = new InjectionToken<CancelEdit>("CANCEL_EDIT")
export const GET_HAS_PREVIEW = new InjectionToken<GetHasPreview>(
  "GET_HAS_PREVIEW",
)
export const GET_IS_AUTHORIZED = new InjectionToken<GetIsAuthorized>(
  "GET_IS_AUTHORIZED",
)
export const GET_IS_SAVING = new InjectionToken<GetIsSaving>("GET_IS_SAVING")
export const GET_MAYBE_ACTIVE_CONTENT_ID = new InjectionToken<
  GetMaybeActiveContentId
>("GET_MAYBE_ACTIVE_CONTENT_ID")
export const GET_MAYBE_ACTIVE_CONTENT_TYPE = new InjectionToken<
  GetMaybeActiveContentType
>("GET_MAYBE_ACTIVE_CONTENT_TYPE")
export const GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL = new InjectionToken<
  GetMaybeActiveContentValueControl
>("GET_MAYBE_ACTIVE_CONTENT_VALUE_CONTROL")
export const GET_MAYBE_ACTIVE_CONTENT_VALUE = new InjectionToken<
  GetMaybeActiveContentValue
>("GET_MAYBE_ACTIVE_CONTENT_VALUE")
export const GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL = new InjectionToken<
  GetMaybeActiveContentTitleControl
>("GET_MAYBE_ACTIVE_CONTENT_TITLE_CONTROL")
export const GET_MAYBE_ACTIVE_CONTENT_TITLE = new InjectionToken<
  GetMaybeActiveContentTitle
>("GET_MAYBE_ACTIVE_CONTENT_TITLE")
export const GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL = new InjectionToken<
  GetMaybeActiveContentCoverImageGroupControl
>("GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP_CONTROL")
export const GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP = new InjectionToken<
  GetMaybeActiveContentCoverImageGroup
>("GET_MAYBE_ACTIVE_CONTENT_COVER_IMAGE_GROUP")
export const GET_MAYBE_ACTIVE_CONTENT = new InjectionToken<
  GetMaybeActiveContent
>("GET_MAYBE_ACTIVE_CONTENT")
export const GET_MAYBE_CONTENT_PREVIEWS = new InjectionToken<
  GetMaybeContentPreviews
>("GET_MAYBE_CONTENT_PREVIEWS")
export const GET_MAYBE_PREVIEW_OR_LIVE_CONTENT = new InjectionToken<
  GetMaybePreviewOrLiveContent
>("GET_MAYBE_PREVIEW_OR_LIVE_CONTENT")
export const GET_PUBLISH_CONFLICTS = new InjectionToken<GetPublishConflicts>(
  "GET_PUBLISH_CONFLICTS",
)
export const OPEN_EDITOR = new InjectionToken<OpenEditor>("OPEN_EDITOR")
export const OPEN_HTML_BLOG_POST_EDITOR = new InjectionToken<
  OpenHtmlBlogPostEditor
>("OPEN_HTML_BLOG_POST_EDITOR")
export const PUBLISH_ALL_OR_REPORT_CONFLICTS = new InjectionToken<
  PublishAllOrReportConflicts
>("PUBLISH_ALL_OR_REPORT_CONFLICTS")
export const PUBLISH_ALL_ON_CONFIRMATION = new InjectionToken<
  PublishAllOnConfirmation
>("PUBLISH_ALL_ON_CONFIRMATION")
export const PUBLISH_ONE_ON_CONFIRMATION = new InjectionToken<
  PublishOneOnConfirmation
>("PUBLISH_ONE_ON_CONFIRMATION")
export const PUBLISH_AND_DELETE_CONTENT_PREVIEW = new InjectionToken<
  PublishAndDeleteContentPreview
>("PUBLISH_AND_DELETE_CONTENT_PREVIEW")
export const PUBLISH_ONE_OVERRIDE = new InjectionToken<PublishOneOverride>(
  "PUBLISH_ONE",
)
export const PUBLISH_ONE_OR_REPORT_CONFLICT = new InjectionToken<
  PublishOneOrReportConflict
>("PUBLISH_ONE_OR_REPORT_CONFLICT")
export const REMOVE_ALL_PREVIEWS_ON_CONFIRMATION = new InjectionToken<
  RemoveAllPreviewsOnConfirmation
>("REMOVE_ALL_PREVIEWS_ON_CONFIRMATION")
export const REMOVE_ALL_PREVIEWS = new InjectionToken<RemoveAllPreviews>(
  "REMOVE_ALL_PREVIEWS",
)
export const REMOVE_FROM_PUBLISH_CONFLICTS = new InjectionToken<
  RemoveFromPublishConflicts
>("REMOVE_FROM_PUBLISH_CONFLICTS")
export const REMOVE_PREVIEW = new InjectionToken<RemovePreview>(
  "REMOVE_PREVIEW",
)
export const SAVE_IF_EDITING = new InjectionToken<SaveIfEditing>(
  "SAVE_IF_EDITING",
)
export const SAVE_AND_CLEAR_IF_EDITING = new InjectionToken<
  SaveAndClearIfEditing
>("SAVE_AND_CLEAR_IF_EDITING")
export const MOVE_CONTENT_TO_TRASH = new InjectionToken<MoveContentToTrash>(
  "MOVE_CONTENT_TO_TRASH",
)
export const CREATE_COVER_IMAGE_PREVIEW_URL = new InjectionToken<
  CreateCoverImagePreviewUrl
>("CREATE_COVER_IMAGE_PREVIEW_URL")
export const CONTENT_CACHE = new InjectionToken<ContentCache>("CONTENT_CACHE")
