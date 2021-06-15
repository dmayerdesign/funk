import { ImageGroup } from "@funk/content/image-group/model/image-group"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (imageGroup: Partial<ImageGroup>): Marshalled<ImageGroup> {
    return marshall(imageGroup, [])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
