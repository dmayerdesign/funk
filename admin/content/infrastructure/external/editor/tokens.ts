import { InjectionToken } from "@angular/core"
import { CancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { GetHasPreview } from "@funk/admin/content/application/external/editor/behaviors/get-has-preview"
import { GetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { GetIsSaving } from "@funk/admin/content/application/external/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentType } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { GetMaybeActiveContentValue } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { GetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { GetMaybeContentPreviews } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-content-previews"
import { GetMaybePreviewOrLiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import { GetPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
import { OpenEditor } from "@funk/admin/content/application/external/editor/behaviors/open-editor"
import { OpenHtmlBlogPostAdder } from "@funk/admin/content/application/external/editor/behaviors/open-html-blog-post-adder"
import { PublishAll } from "@funk/admin/content/application/external/editor/behaviors/publish-all"
import { PublishAllOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/publish-all-on-confirmation"
import { PublishAndDeleteContentPreview } from "@funk/admin/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { PublishOne } from "@funk/admin/content/application/external/editor/behaviors/publish-one"
import { PublishOrReportConflict } from "@funk/admin/content/application/external/editor/behaviors/publish-or-report-conflict"
import { RemoveAllPreviews } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews"
import { RemoveAllPreviewsOnConfirmation } from "@funk/admin/content/application/external/editor/behaviors/remove-all-previews-on-confirmation"
import { RemoveFromPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/remove-from-publish-conflicts"
import { RemovePreview } from "@funk/admin/content/application/external/editor/behaviors/remove-preview"
import { SaveAndClearIfEditing } from "@funk/admin/content/application/external/editor/behaviors/save-and-clear-if-editing"

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
export const OPEN_HTML_BLOG_POST_ADDER = new InjectionToken<
  OpenHtmlBlogPostAdder
>("OPEN_HTML_BLOG_POST_ADDER")
export const PUBLISH_ALL = new InjectionToken<PublishAll>("PUBLISH_ALL")
export const PUBLISH_ALL_ON_CONFIRMATION = new InjectionToken<
  PublishAllOnConfirmation
>("PUBLISH_ALL_ON_CONFIRMATION")
export const PUBLISH_AND_DELETE_CONTENT_PREVIEW = new InjectionToken<
  PublishAndDeleteContentPreview
>("PUBLISH_AND_DELETE_CONTENT_PREVIEW")
export const PUBLISH_ONE = new InjectionToken<PublishOne>("PUBLISH_ONE")
export const PUBLISH_OR_REPORT_CONFLICT = new InjectionToken<
  PublishOrReportConflict
>("PUBLISH_OR_REPORT_CONFLICT")
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
export const SAVE_AND_CLEAR_IF_EDITING = new InjectionToken<
  SaveAndClearIfEditing
>("SAVE_AND_CLEAR_IF_EDITING")
