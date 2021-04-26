import { Content } from "@funk/admin/content/model/content"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (content: Partial<Content>): Marshalled<Content> {
    return marshall(content, [])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
