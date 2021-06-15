import { AddHtmlBlogPostCoverImage } from "@funk/blog/infrastructure/external/cloud-functions/add-html-blog-post-cover-image"
import { GetIsSaving } from "@funk/content/application/external/editor/behaviors/get-is-saving"
import { GetMaybeActiveContent } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content"
import { GetMaybeActiveContentCoverImageGroup } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-cover-image-group"
import { GetMaybeActiveContentId } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-id"
import { GetMaybeActiveContentTitle } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-title"
import { GetMaybeActiveContentValue } from "@funk/content/application/external/editor/behaviors/get-maybe-active-content-value"
import { ImageGroup } from "@funk/content/image-group/model/image-group"
import imageGroupIsInvalid from "@funk/content/image-group/model/validators/image-group-is-invalid"
import createContentHtml from "@funk/content/model/behaviors/create-content-html"
import createContentHtmlBlogPost from "@funk/content/model/behaviors/create-content-html-blog-post"
import createContentText from "@funk/content/model/behaviors/create-content-text"
import { ContentHtmlBlogPost, ContentType } from "@funk/content/model/content"
import { UpdateById } from "@funk/content/preview/application/external/behaviors/persistence/update-by-id"
import throwNotImplementedError from "@funk/error/helpers/throw-not-implemented-error"
import { asPromise } from "@funk/helpers/as-promise"
import { DomGetInnerText } from "@funk/ui/infrastructure/external/helpers/dom/get-inner-text"
import { isEqual } from "lodash"
import { v4 as uuid } from "uuid"

export function construct(
  getIsSaving: GetIsSaving,
  getMaybeActiveContent: GetMaybeActiveContent,
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getMaybeActiveContentValue: GetMaybeActiveContentValue,
  getMaybeActiveContentTitle: GetMaybeActiveContentTitle,
  getMaybeActiveContentCoverImageGroup: GetMaybeActiveContentCoverImageGroup,
  domGetInnerText: DomGetInnerText,
  updateById: UpdateById,
  addHtmlBlogPostCoverImage: AddHtmlBlogPostCoverImage,
) {
  return async function (): Promise<void> {
    const content = await asPromise(getMaybeActiveContent())
    const contentId = (await asPromise(getMaybeActiveContentId())) ?? uuid()
    const newTitle = (await asPromise(getMaybeActiveContentTitle())) ?? ""
    const newValueHtml = (await asPromise(getMaybeActiveContentValue())) ?? ""
    const maybeActiveCoverImageGroup = await asPromise(
      getMaybeActiveContentCoverImageGroup(),
    )

    if (content) {
      const coverImageIsNew =
        !!(content as ContentHtmlBlogPost)?.coverImageGroup &&
        !isEqual(
          maybeActiveCoverImageGroup,
          (content as ContentHtmlBlogPost)?.coverImageGroup,
        )

      if (
        newTitle !== ((content as ContentHtmlBlogPost)?.title ?? "") ||
        newValueHtml !== (content.value ?? "") ||
        coverImageIsNew
      ) {
        getIsSaving().next(true)
      } else {
        return
      }

      try {
        const newCoverImageGroup =
          coverImageIsNew && !imageGroupIsInvalid(maybeActiveCoverImageGroup)
            ? await addHtmlBlogPostCoverImage({
                contentId: content.id,
                images: maybeActiveCoverImageGroup?.images ?? {},
              })
            : maybeActiveCoverImageGroup ?? ({} as ImageGroup)

        const updatedContent =
          content?.type === ContentType.HTML_BLOG_POST
            ? createContentHtmlBlogPost(contentId, {
                ...content,
                title: newTitle,
                value: newValueHtml,
                coverImageGroup: newCoverImageGroup,
              })
            : content?.type === ContentType.HTML
            ? createContentHtml(contentId, {
                ...content,
                value: newValueHtml,
              })
            : content?.type === ContentType.IMAGE
            ? throwNotImplementedError(
                "Image-only content is not yet supported. To add an image, create a blog post.",
              )
            : createContentText(contentId, {
                ...content,
                value: domGetInnerText(newValueHtml),
              })

        await updateById(contentId, {
          updatedAt: Date.now(),
          content: updatedContent,
        })
      } catch (error) {
        console.error("There was an error updating the preview. Details:")
        console.error(error)
      }
      getIsSaving().next(false)
    }
  }
}

export type SaveIfEditing = ReturnType<typeof construct>
