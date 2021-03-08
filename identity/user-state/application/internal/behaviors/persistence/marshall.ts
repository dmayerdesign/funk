import { UserState } from "@funk/identity/model/user-state"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (userState: UserState): Marshalled<UserState> {
    return marshall(userState, [])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
