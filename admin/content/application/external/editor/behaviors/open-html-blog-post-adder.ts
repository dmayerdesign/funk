import { GetIsAuthorized } from "@funk/admin/content/application/external/editor/behaviors/get-is-authorized"
import { GetMaybeActiveContentId } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-active-content-id"
import {
  ContentHtmlBlogPost,
  ContentType,
} from "@funk/admin/content/model/content"
import { SetById as SetContentPreviewById } from "@funk/admin/content/preview/application/external/behaviors/persistence/set-by-id"
import { asPromise } from "@funk/helpers/as-promise"
import { DbDocumentInput } from "@funk/persistence/model/database-document"
import { v4 as uuid } from "uuid"

export function construct(
  getMaybeActiveContentId: GetMaybeActiveContentId,
  getIsAuthorized: GetIsAuthorized,
  setContentPreviewById: SetContentPreviewById,
) {
  return async function (
    contentData: Partial<DbDocumentInput<ContentHtmlBlogPost>>,
  ): Promise<void> {
    const canActivate = await asPromise(getIsAuthorized())
    if (canActivate) {
      const newContentId = uuid()
      await setContentPreviewById(newContentId, {
        content: {
          id: newContentId,
          type: ContentType.HTML_BLOG_POST,
          title: "",
          value: "",
          coverImageUrl: "",
          taxonomyTerms: [],
          removedAt: null,
          ...contentData,
        },
      })
      getMaybeActiveContentId().next(newContentId)
    }
  }
}

export type OpenHtmlBlogPostAdder = ReturnType<typeof construct>
