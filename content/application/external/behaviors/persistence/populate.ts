import { IMAGE_GROUPS } from "@funk/content/image-group/model/image-group"
import { Content, ContentType } from "@funk/content/model/content"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(populate: GenericPopulate<Content>) {
  return async function (
    content: Marshalled<Content> | undefined,
  ): Promise<Content | undefined> {
    if (content?.type === ContentType.IMAGE) {
      return await populate(content, [
        {
          key: "value",
          collectionPath: IMAGE_GROUPS,
          relationship: "one-to-one",
        },
      ])
    }
    if (content?.type === ContentType.HTML_BLOG_POST) {
      return await populate(content, [
        {
          key: "coverImageGroup",
          collectionPath: IMAGE_GROUPS,
          relationship: "one-to-one",
        },
      ])
    }
    return content as Content
  }
}

export type Populate = ReturnType<typeof construct>
