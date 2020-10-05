import { authAdmin as authAdminImpl } from "@funk/api/plugins/auth/auth-admin"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import { UserRole } from "@funk/model/auth/user-role"

export function construct(authAdmin: typeof authAdminImpl)
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

export default construct(authAdminImpl)

export type SetRoleForNewUser = ReturnType<typeof construct>
