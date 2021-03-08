import { UserState } from "@funk/identity/model/user-state"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(_marshall: GenericMarshall) {
  return function (userState: Partial<UserState>): Marshalled<UserState> {
    return userState as UserState
  }
}

export type Marshall = ReturnType<typeof construct>
