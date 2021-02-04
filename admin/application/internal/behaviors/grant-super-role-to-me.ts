import { UserRole } from "@funk/auth/model/user-role"
import { authAdmin as authAdminImpl } from "@funk/auth/plugins/internal/auth-admin"
import { OWNER_EMAIL } from "@funk/configuration"

export function construct(authAdmin: typeof authAdminImpl) {
  return async function (): Promise<void> {
    const me = await authAdmin().getUserByEmail(OWNER_EMAIL)
    if (me.emailVerified) {
      await authAdmin().setCustomUserClaims(me.uid, { role: UserRole.SUPER })
    }
  }
}

export default construct(authAdminImpl)

export type GrantSuperRoleToMe = ReturnType<typeof construct>
