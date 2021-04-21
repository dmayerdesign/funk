import { UserContent } from "@funk/identity/model/user-content"
import {
  Marshall as GenericMarshall,
  Marshalled,
} from "@funk/persistence/application/external/behaviors/marshall"

export function construct(_marshall: GenericMarshall) {
  return function (userContent: Partial<UserContent>): Marshalled<UserContent> {
    return userContent as UserContent
  }
}

export type Marshall = ReturnType<typeof construct>
