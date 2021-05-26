import { Content, ContentType } from "@funk/admin/content/model/content"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
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

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
