import { authAdmin as authAdminImpl } from "@funk/api/plugins/auth/auth-admin"
import { UserRole } from "@funk/model/auth/user-role"

export function construct(authAdmin: typeof authAdminImpl) {
  return async function (): Promise<void> {
    const me = await authAdmin().getUserByEmail("d.a.mayer92@gmail.com")
    if (me.emailVerified) {
      await authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
    }
  }
}

export default construct(authAdminImpl)

export type GrantSuperRoleToMe = ReturnType<typeof construct>
