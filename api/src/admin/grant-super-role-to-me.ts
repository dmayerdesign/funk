import { UserRole } from "@funk/model/auth/user-role"
import { authAdmin as authAdminImpl } from "@funk/plugins/auth/auth-admin"

export function construct(
  authAdmin = authAdminImpl
)
{
  return async function(): Promise<void>
  {
    const me = await authAdmin().getUserByEmail("d.a.mayer92@gmail.com")
    if (me.emailVerified)
    {
      await authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
    }
  }
}

export default construct()

export type GrantSuperRoleToMe = ReturnType<typeof construct>
