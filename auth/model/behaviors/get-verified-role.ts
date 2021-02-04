import { CustomClaims } from "@funk/auth/model/custom-claims"
import { UserRole } from "@funk/auth/model/user-role"

export default function (
  verifications: { emailVerified: boolean },
  claims?: CustomClaims,
): UserRole {
  if (!claims || !claims.role) {
    return UserRole.ANONYMOUS
  }

  if (!verifications.emailVerified) {
    return UserRole.ANONYMOUS
  }

  return claims.role
}
