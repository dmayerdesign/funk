import { Content, ContentType } from "@funk/content/model/content"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(marshall: GenericMarshall) {
  return function (content: Partial<Content>): Marshalled<Content> {
    if (content.type === ContentType.IMAGE) {
      return marshall(content, ["value"])
    }
    if (content.type === ContentType.HTML_BLOG_POST) {
      return marshall(content, ["coverImageGroup"])
    }
    return marshall(content, [])
  }
}

export type Marshall = ReturnType<typeof construct>
