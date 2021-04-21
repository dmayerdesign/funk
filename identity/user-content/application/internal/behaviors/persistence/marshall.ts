import { UserContent } from "@funk/identity/model/user-content"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (userContent: UserContent): Marshalled<UserContent> {
    return marshall(userContent, [])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
