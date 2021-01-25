import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { UserState, USER_STATES } from "@funk/identity/domain/user-state"
import setByIdImpl from "@funk/persistence/application/internal/behaviors/set-by-id"

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
