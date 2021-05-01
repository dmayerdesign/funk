import { GetById as GetContentById } from "@funk/admin/content/application/external/behaviors/persistence/get-by-id"
import { GetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import createContentHtmlBlogPost from "@funk/admin/content/model/behaviors/create-content-html-blog-post"
import {
  ContentHtmlBlogPost,
  ContentType,
} from "@funk/admin/content/model/content"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { SetById as SetContentPreviewById } from "@funk/admin/content/preview/application/external/behaviors/persistence/set-by-id"
import { ForbiddenError } from "@funk/error/model/forbidden-error"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { InvalidStateError } from "@funk/error/model/invalid-state-error"
import { NotFoundError } from "@funk/error/model/not-found-error"
import { asPromise } from "@funk/helpers/as-promise"
import { maybePluck } from "@funk/helpers/rxjs-shims"
import { UserContent$ } from "@funk/identity/application/external/user-content"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { v4 as uuid } from "uuid"

type Options = {
  contentData?: Partial<ContentHtmlBlogPost>
  id?: PrimaryKey
}

export function construct(
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getIsAuthorized: GetIsAuthorized,
  setContentPreviewById: SetContentPreviewById,
  getContentById: GetContentById,
  userContentChanges: UserContent$,
) {
  return async function ({ id, contentData }: Options): Promise<void> {
    throwIfArgumentsAreInvalid({ id, contentData })
    await throwIfStateIsInvalid()

    const contentPreviews = await asPromise(
      userContentChanges.pipe(maybePluck("contentPreviews")),
    )
    const contentPreviewsList = Object.keys(contentPreviews ?? {}).map(
      (_contentId) => contentPreviews?.[_contentId],
    )

    try {
      if (id) {
        const existingContentPreview = contentPreviewsList.find(
          (contentPreview) => contentPreview?.content.id === id,
        )
        const existingContent = await getContentById(id)
        if (!existingContentPreview && !existingContent) {
          throw new NotFoundError(
            `The content ID ${id} was provided, but neither a preview nor a published content with that ID could be found.`,
          )
        } else {
          getMaybeActiveContentId().next(id)
        }
      } else {
        // Try to find an unpublished blog post.
        // Only one unpublished blog post preview can exist at a time.
        const existingUnpublishedBlogPostPreview = contentPreviewsList.find(
          (contentPreview) =>
            contentPreview?.content?.type === ContentType.HTML_BLOG_POST &&
            contentPreview?.isUnpublished,
        )

        if (existingUnpublishedBlogPostPreview) {
          // Ignore the `contentData` that was passed in.
          const unpublishedContentId =
            existingUnpublishedBlogPostPreview.content.id
          getMaybeActiveContentId().next(unpublishedContentId!)
        } else {
          const newContentId = uuid()
          const newContentPreview: ContentPreview = {
            isUnpublished: true,
            updatedAt: Date.now(),
            content: createContentHtmlBlogPost(newContentId, contentData),
          }
          await setContentPreviewById(newContentId, newContentPreview)
          getMaybeActiveContentId().next(newContentId!)
        }
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function throwIfStateIsInvalid(): Promise<void> {
    const canActivate = await asPromise(getIsAuthorized())
    const maybeActiveContentId = await asPromise(getMaybeActiveContentId())

    if (maybeActiveContentId) {
      throw new InvalidStateError("Content is already being edited.")
    }
    if (!canActivate) {
      throw new ForbiddenError(
        "You do not have permission to edit this content.",
      )
    }
  }

  function throwIfArgumentsAreInvalid({ id, contentData }: Options): void {
    if (id && contentData) {
      throw new InvalidInputError(`
OpenHtmlBlogPostEditor accepts only one of \`id\` or \`contentData\`. Both were provided.
id = ${id}
contentData = ${contentData}`)
    }
    if (!id && !contentData) {
      throw new InvalidInputError(`
OpenHtmlBlogPostEditor accepts one of \`id\` or \`contentData\`. Neither was provided.`)
    }
  }
}

export type OpenHtmlBlogPostEditor = ReturnType<typeof construct>
