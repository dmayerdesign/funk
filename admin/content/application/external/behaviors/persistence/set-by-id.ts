import { Marshall } from "@funk/admin/content/application/external/behaviors/persistence/marshall"
import {
  Content,
  ContentHtml,
  ContentHtmlBlogPost,
  ContentImage,
  CONTENTS,
  ContentText,
  ContentType,
} from "@funk/admin/content/model/content"
import throwIfContentHtmlBlogPostIsInvalid from "@funk/admin/content/model/validators/throw-if-content-html-blog-post-is-invalid"
import throwIfContentHtmlIsInvalid from "@funk/admin/content/model/validators/throw-if-content-html-is-invalid"
import throwIfContentImageIsInvalid from "@funk/admin/content/model/validators/throw-if-content-image-is-invalid"
import throwIfContentTextIsInvalid from "@funk/admin/content/model/validators/throw-if-content-text-is-invalid"
import { SetById as GenericSetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { DbDocumentInput } from "@funk/persistence/model/database-document"
import { v4 as uuid } from "uuid"

export function construct(setById: GenericSetById, marshall: Marshall) {
  return async function (
    documentPath: string,
    documentData: DbDocumentInput<Content>,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    const dataForValidation = {
      ...documentData,
      id: uuid(),
      removedAt: null,
    }
    switch (documentData.type) {
      case ContentType.IMAGE:
        throwIfContentImageIsInvalid(dataForValidation as ContentImage)
        break
      case ContentType.HTML:
        throwIfContentHtmlIsInvalid(dataForValidation as ContentHtml)
        break
      case ContentType.HTML_BLOG_POST:
        throwIfContentHtmlBlogPostIsInvalid(
          dataForValidation as ContentHtmlBlogPost,
        )
        break
      default:
        throwIfContentTextIsInvalid(dataForValidation as ContentText)
        break
    }

    await setById(
      CONTENTS,
      documentPath,
      marshall(documentData as Partial<Content>),
      options,
    )
  }
}

export type SetById = ReturnType<typeof construct>
