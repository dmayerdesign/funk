import { UserContent } from "@funk/identity/model/user-content"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(_populate: GenericPopulate<UserContent>) {
  return async function (
    userContent: Marshalled<UserContent> | undefined,
  ): Promise<UserContent> {
    return userContent as UserContent
  }
}

export type Populate = ReturnType<typeof construct>
