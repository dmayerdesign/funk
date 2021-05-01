import { GetIsSaving } from "@funk/admin/content/application/external/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentTitle } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-title"
import { GetMaybeActiveContentValue } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-value"
import createContentHtml from "@funk/admin/content/model/behaviors/create-content-html"
import createContentHtmlBlogPost from "@funk/admin/content/model/behaviors/create-content-html-blog-post"
import createContentText from "@funk/admin/content/model/behaviors/create-content-text"
import { ContentType } from "@funk/admin/content/model/content"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { UpdateById } from "@funk/admin/content/preview/application/external/behaviors/persistence/update-by-id"
import { asPromise } from "@funk/helpers/as-promise"
import { DomGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"
import { v4 as uuid } from "uuid"

export function construct(
  getIsSaving: GetIsSaving,
  getMaybeActiveContent: GetMaybeActiveContent,
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getMaybeActiveContentValue: GetMaybeActiveContentValue,
  getMaybeActiveContentTitle: GetMaybeActiveContentTitle,
  domGetInnerText: DomGetInnerText,
  updateById: UpdateById,
) {
  return async function (): Promise<void> {
    const content = await asPromise(getMaybeActiveContent())

    if (content) {
      getIsSaving().next(true)

      const contentId = (await asPromise(getMaybeActiveContentId())) ?? uuid()
      const newTitle = (await asPromise(getMaybeActiveContentTitle())) ?? ""
      const newValueHtml = (await asPromise(getMaybeActiveContentValue())) ?? ""

      try {
        const contentType = content?.type
        const updatedContent =
          contentType === ContentType.HTML_BLOG_POST
            ? createContentHtmlBlogPost(contentId, {
                ...content,
                title: newTitle,
                value: newValueHtml,
              })
            : contentType === ContentType.HTML
            ? createContentHtml(contentId, {
                ...content,
                value: newValueHtml,
              })
            : createContentText(contentId, {
                ...content,
                value: domGetInnerText(newValueHtml),
              })

        const contentPreviewUpdate: Partial<ContentPreview> = {
          updatedAt: Date.now(),
          content: updatedContent,
        }

        await updateById(contentId, contentPreviewUpdate)
      } catch (error) {
        console.error("There was an error updating the preview. Details:")
        console.error(error)
      }
      getIsSaving().next(false)
    }
  }
}

export type SaveIfEditing = ReturnType<typeof construct>
