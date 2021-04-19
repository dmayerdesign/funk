import { CancelEdit } from "@funk/admin/content/application/external/editor/behaviors/cancel-edit"
import { GetIsSaving } from "@funk/admin/content/application/external/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentValue } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { GetMaybeActiveContentValueControl } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value-control"
import { Content, ContentType } from "@funk/admin/content/model/content"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { UpdateById } from "@funk/admin/content/preview/application/external/behaviors/persistence/update-by-id"
import { asPromise } from "@funk/helpers/as-promise"
import { DomGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"

export function construct(
  getMaybeActiveContentValueControl: GetMaybeActiveContentValueControl,
  getIsSaving: GetIsSaving,
  getMaybeActiveContent: GetMaybeActiveContent,
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getMaybeActiveContentValue: GetMaybeActiveContentValue,
  domGetInnerText: DomGetInnerText,
  updateById: UpdateById,
  cancelEdit: CancelEdit,
) {
  return async function (): Promise<void> {
    const control = await asPromise(getMaybeActiveContentValueControl())

    if (control) {
      getIsSaving().next(true)

      const content = await asPromise(getMaybeActiveContent())
      const contentId = (await asPromise(getMaybeActiveContentId())) as string
      const htmlValue = await asPromise(getMaybeActiveContentValue())

      try {
        const contentPreviewUpdate: Partial<ContentPreview> = {
          createdAt: Date.now(),
          content: {
            id: contentId,
            type: content!.type,
            value:
              content!.type === ContentType.HTML
                ? htmlValue
                : domGetInnerText(htmlValue),
          } as Content,
        }

        await updateById(contentId, contentPreviewUpdate)
      } catch (error) {
        console.log("There was an error updating the preview.", error)
      }
      getIsSaving().next(false)
      cancelEdit()
    }
  }
}

export type SaveAndClearIfEditing = ReturnType<typeof construct>
