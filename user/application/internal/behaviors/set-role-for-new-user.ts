import { UserRole } from "@funk/auth/domain/user-role"
import { authAdmin as authAdminImpl } from "@funk/auth/plugins/internal/auth-admin"
import { UserRecord } from "@funk/auth/plugins/internal/user-record"

export function construct(authAdmin: typeof authAdminImpl) {
  return async function (user: UserRecord): Promise<any> {
    if (user.email) {
      await authAdmin().setCustomUserClaims(user.uid, { role: UserRole.PUBLIC })
    } else {
      await authAdmin().setCustomUserClaims(user.uid, {
        role: UserRole.ANONYMOUS,
      })
    }
  }
}

export default construct(authAdminImpl)

export type SetRoleForNewUser = ReturnType<typeof construct>
