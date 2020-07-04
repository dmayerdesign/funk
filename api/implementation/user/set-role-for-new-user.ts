import { authAdmin as authAdminImpl } from "@funk/plugins/auth/auth-admin"
import { UserRecord } from "@funk/plugins/auth/user-record"
import { UserRole } from "@funk/model/auth/user-role"

export function construct(authAdmin = authAdminImpl)
{
  return async function(user: UserRecord): Promise<any>
  {
    if (user.email)
    {
      await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.PUBLIC })
    }
    else
    {
      await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.ANONYMOUS })
    }
  }
}

export default construct()

export type SetRoleForNewUser = ReturnType<typeof construct>
