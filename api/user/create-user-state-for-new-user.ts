import setByIdImpl from "@funk/api/plugins/persistence/actions/set-by-id"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import { USER_STATES, UserState } from "@funk/model/identity/user-state"

export function construct(setById = setByIdImpl)
{
  return async function(user: UserRecord): Promise<any>
  {
    if (user.email)
    {
      const newUserState: UserState = {
        id: user.uid,
      }
      await setById(USER_STATES, newUserState.id, newUserState)
    }
  }
}

export default construct()

export type CreateUserStateForNewUser = ReturnType<typeof construct>
