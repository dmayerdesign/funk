import { construct as constructCancelEdit } from "@funk/ui/core/admin/managed-content/editor/behaviors/cancel-edit"
import { construct as constructGetHasPreview } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-has-preview"
import { construct as constructGetIsAuthorized } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-is-authorized"
import getIsSavingImpl from "@funk/ui/core/admin/managed-content/editor/behaviors/get-is-saving"
import { construct as constructGetMaybeActiveContent } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content"
import getMaybeActiveContentIdImpl from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-id"
import { construct as constructGetMaybeActiveContentType } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-type"
import { construct as constructGetMaybeActiveContentValue } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-value"
import { construct as constructGetMaybeActiveContentValueControl } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-active-content-value-control"
import { construct as constructGetMaybeContentPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-content-previews"
import { construct as constructGetMaybePreviewOrLiveContent } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-preview-or-live-content"
import getPublishConflictsImpl from "@funk/ui/core/admin/managed-content/editor/behaviors/get-publish-conflicts"
import { construct as constructOpenEditor } from "@funk/ui/core/admin/managed-content/editor/behaviors/open-editor"
import { construct as constructPublishAll } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-all"
import { construct as constructPublishAllOnConfirmation } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-all-on-confirmation"
import { construct as constructPublishAndDeleteContentPreview } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-and-delete-content-preview"
import { construct as constructPublishOne } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-one"
import { construct as constructPublishOrReportConflict } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-or-report-conflict"
import { construct as constructRemoveAllPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-all-previews"
import { construct as constructRemoveAllPreviewsOnConfirmation } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-all-previews-on-confirmation"
import { construct as constructRemoveFromPublishConflicts } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-from-publish-conflicts"
import { construct as constructRemovePreview } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-preview"
import { construct as constructSaveAndClearIfEditing } from "@funk/ui/core/admin/managed-content/editor/behaviors/save-and-clear-if-editing"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { construct as constructGetInnerText } from "@funk/ui/helpers/html/get-inner-text"
import { DeviceWidth } from "@funk/ui/plugins/layout/device-width"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { construct as constructListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { construct as constructSetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { construct as constructUpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"
import { AlertController } from "@ionic/angular"

export function construct(
  userSession: UserSession,
  listenById: ReturnType<typeof constructListenById>,
  getById: GetById,
  setById: ReturnType<typeof constructSetById>,
  updateById: ReturnType<typeof constructUpdateById>,
  getInnerText: ReturnType<typeof constructGetInnerText>,
  alert: AlertController,
  deviceWidth: DeviceWidth
) {
  return new (class ManagedContentEditorService {
    public constructor(
      public getMaybeActiveContentId = getMaybeActiveContentIdImpl,
      public getIsAuthorized = constructGetIsAuthorized(
        userSession,
        deviceWidth
      ),
      _getIsSaving = getIsSavingImpl,
      public getMaybePreviewOrLiveContent = constructGetMaybePreviewOrLiveContent(
        userSession,
        getIsAuthorized,
        listenById
      ),
      _getMaybeContentPreviews = constructGetMaybeContentPreviews(getById),
      public getMaybeActiveContent = constructGetMaybeActiveContent(
        getMaybeActiveContentId,
        getMaybePreviewOrLiveContent
      ),
      public getMaybeActiveContentType = constructGetMaybeActiveContentType(
        getMaybeActiveContent
      ),
      public getMaybeActiveContentValueControl = constructGetMaybeActiveContentValueControl(
        getMaybeActiveContent
      ),
      public getMaybeActiveContentValue = constructGetMaybeActiveContentValue(
        getMaybeActiveContentValueControl
      ),
      public getHasPreview = constructGetHasPreview(userSession, listenById),
      public getPublishConflicts = getPublishConflictsImpl,
      public cancelEdit = constructCancelEdit(getMaybeActiveContentId),
      public openEditor = constructOpenEditor(
        getMaybeActiveContentId,
        getIsAuthorized
      ),
      _removeFromPublishConflicts = constructRemoveFromPublishConflicts(
        getPublishConflicts
      ),
      public removeAllPreviews = constructRemoveAllPreviews(
        updateById,
        userSession,
        getPublishConflicts
      ),
      public removePreview = constructRemovePreview(
        _getMaybeContentPreviews,
        userSession,
        updateById,
        _removeFromPublishConflicts
      ),
      _publishOrReportConflict = constructPublishOrReportConflict(
        getById,
        setById,
        updateById,
        getPublishConflicts,
        _getMaybeContentPreviews
      ),
      public publishAll = constructPublishAll(_publishOrReportConflict),
      public publishAllOnConfirmation = constructPublishAllOnConfirmation(
        userSession,
        alert,
        _getMaybeContentPreviews,
        publishAll
      ),
      _publishAndDeleteContentPreview = constructPublishAndDeleteContentPreview(
        setById,
        updateById,
        _getMaybeContentPreviews
      ),
      public publishOne = constructPublishOne(
        userSession,
        _publishAndDeleteContentPreview,
        _removeFromPublishConflicts
      ),
      public removeAllPreviewsOnConfirmation = constructRemoveAllPreviewsOnConfirmation(
        alert,
        removeAllPreviews
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
        cancelEdit
      )
    ) {}
  })()
}

export type ManagedContentEditorService = ReturnType<typeof construct>
