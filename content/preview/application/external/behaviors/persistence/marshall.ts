import { ContentType } from "@funk/content/model/content"
import { ContentPreview } from "@funk/content/model/content-preview"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(marshall: GenericMarshall) {
  return function (
    contentPreview: Partial<ContentPreview>,
  ): Marshalled<ContentPreview> {
    return {
      ...(contentPreview as ContentPreview),
      // if type is IMAGE
      content:
        contentPreview.content?.type === ContentType.IMAGE
          ? // then marshall `value`
            marshall(contentPreview.content, ["value"])
          : // else if type is HTML_BLOG_POST
          contentPreview.content?.type === ContentType.HTML_BLOG_POST
          ? // then marshall `coverImageGroup`
            marshall(contentPreview.content, ["coverImageGroup"])
          : // else do nothing
            contentPreview.content,
    }
  }
}

export type Marshall = ReturnType<typeof construct>
