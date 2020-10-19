import { UserRecord } from "@funk/api/plugins/auth/user-record"
import setByIdImpl from "@funk/api/plugins/persistence/behaviors/set-by-id"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"

export function construct(setById: typeof setByIdImpl) {
  return async function (user: UserRecord): Promise<any> {
    if (user.email) {
      const newUserState: UserState = {
        id: user.uid,
      }
      await setById(USER_STATES, newUserState.id, newUserState)
    }
  }
}

export default construct(setByIdImpl)

export type CreateUserStateForNewUser = ReturnType<typeof construct>
