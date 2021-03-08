import { UserState } from "@funk/identity/model/user-state"
import { Marshalled } from "@funk/persistence/application/external/behaviors/marshall"
import { Populate as GenericPopulate } from "@funk/persistence/application/external/behaviors/populate"

export function construct(_populate: GenericPopulate<UserState>) {
  return async function (
    userState: Marshalled<UserState> | undefined,
  ): Promise<UserState> {
    return userState as UserState
  }
}

export type Populate = ReturnType<typeof construct>
