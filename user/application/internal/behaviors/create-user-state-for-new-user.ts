import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import { UserState } from "@funk/identity/model/user-state"
import setByIdImpl, {
  SetById,
} from "@funk/identity/user-state/application/internal/behaviors/persistence/set-by-id"

export function construct(setById: SetById) {
  return async function (user: UserRecord): Promise<any> {
    if (user.email) {
      const newUserState: UserState = {
        id: user.uid,
      }
      await setById(newUserState.id, newUserState)
    }
  }
}

export default construct(setByIdImpl)

export type CreateUserStateForNewUser = ReturnType<typeof construct>
