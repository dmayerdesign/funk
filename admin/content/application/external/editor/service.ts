import { construct as constructCancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { construct as constructGetHasPreview } from "@funk/admin/content/application/external/editor/behaviors/get-has-preview"
import { construct as constructGetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import getIsSavingImpl from "@funk/admin/content/application/external/editor/behaviors/get-is-saving"
import { construct as constructGetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import getMaybeActiveContentIdImpl from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { construct as constructGetMaybeActiveContentType } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-type"
import { construct as constructGetMaybeActiveContentValue } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { construct as constructGetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { construct as constructGetMaybeContentPreviews } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-content-previews"
import { construct as constructGetMaybePreviewOrLiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-preview-or-live-content"
import getPublishConflictsImpl from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
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
import { UserSession } from "@funk/identity/application/external/user-session"
import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { construct as constructListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { construct as constructSetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { construct as constructUpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"
import { construct as constructGetInnerText } from "@funk/ui/infrastructure/external/helpers/html/get-inner-text"
import { DeviceWidth } from "@funk/ui/plugins/external/layout/device-width"
import { AlertController } from "@ionic/angular"

export function construct(
  userSession: UserSession,
  listenById: ReturnType<typeof constructListenById>,
  getById: GetById,
  setById: ReturnType<typeof constructSetById>,
  updateById: ReturnType<typeof constructUpdateById>,
  getInnerText: ReturnType<typeof constructGetInnerText>,
  alert: AlertController,
  deviceWidth: DeviceWidth,
) {
  return new (class ContentEditorService {
    public constructor(
      public getMaybeActiveContentId = getMaybeActiveContentIdImpl,
      public getIsAuthorized = constructGetIsAuthorized(
        userSession,
        deviceWidth,
      ),
      _getIsSaving = getIsSavingImpl,
      public getMaybePreviewOrLiveContent = constructGetMaybePreviewOrLiveContent(
        userSession,
        listenById,
      ),
      _getMaybeContentPreviews = constructGetMaybeContentPreviews(getById),
      public getMaybeActiveContent = constructGetMaybeActiveContent(
        getMaybeActiveContentId,
        getMaybePreviewOrLiveContent,
      ),
      public getMaybeActiveContentType = constructGetMaybeActiveContentType(
        getMaybeActiveContent,
      ),
      public getMaybeActiveContentValueControl = constructGetMaybeActiveContentValueControl(
        getMaybeActiveContent,
      ),
      public getMaybeActiveContentValue = constructGetMaybeActiveContentValue(
        getMaybeActiveContentValueControl,
      ),
      public getHasPreview = constructGetHasPreview(userSession, listenById),
      public getPublishConflicts = getPublishConflictsImpl,
      public cancelEdit = constructCancelEdit(getMaybeActiveContentId),
      public openEditor = constructOpenEditor(
        getMaybeActiveContentId,
        getIsAuthorized,
      ),
      _removeFromPublishConflicts = constructRemoveFromPublishConflicts(
        getPublishConflicts,
      ),
      public removeAllPreviews = constructRemoveAllPreviews(
        updateById,
        userSession,
        getPublishConflicts,
      ),
      public removePreview = constructRemovePreview(
        _getMaybeContentPreviews,
        userSession,
        updateById,
        _removeFromPublishConflicts,
      ),
      _publishAndDeleteContentPreview = constructPublishAndDeleteContentPreview(
        setById,
        updateById,
        _getMaybeContentPreviews,
      ),
      _publishOrReportConflict = constructPublishOrReportConflict(
        getById,
        _publishAndDeleteContentPreview,
        getPublishConflicts,
      ),
      public publishAll = constructPublishAll(_publishOrReportConflict),
      public publishAllOnConfirmation = constructPublishAllOnConfirmation(
        userSession,
        alert,
        _getMaybeContentPreviews,
        publishAll,
      ),
      public publishOne = constructPublishOne(
        userSession,
        _publishAndDeleteContentPreview,
        _removeFromPublishConflicts,
      ),
      public removeAllPreviewsOnConfirmation = constructRemoveAllPreviewsOnConfirmation(
        alert,
        removeAllPreviews,
      ),
      public saveAndClearIfEditing = constructSaveAndClearIfEditing(
        getMaybeActiveContentValueControl,
        _getIsSaving,
        userSession,
        getMaybeActiveContent,
        getMaybeActiveContentId,
        getMaybeActiveContentValue,
        getInnerText,
        updateById,
        cancelEdit,
      ),
    ) {}
  })()
}

export type ContentEditorService = ReturnType<typeof construct>
