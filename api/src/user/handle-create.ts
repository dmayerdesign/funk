import { UserRole } from "@funk/model/auth/user-role"
import { PERSONS, Person } from "@funk/model/identity/person"
import { authAdmin } from "@funk/plugins/auth/auth-admin"
import { UserRecord } from "@funk/plugins/auth/user-record"
import setByIdImpl from "@funk/plugins/persistence/actions/set-by-id"

export function construct(setById = setByIdImpl)
{
  return async function(user: UserRecord): Promise<any>
  {
    if (user.email)
    {
      await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.PUBLIC })

      const newPerson: Person = {
        id: user.uid,
        displayName: user.displayName,
        email: user.email,
      }

      await setById(PERSONS, newPerson.id, newPerson)
    }
    else
    {
      await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })
    }
  }
}

export default construct()

export type HandleCreate = ReturnType<typeof construct>
