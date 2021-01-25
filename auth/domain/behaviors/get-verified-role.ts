import { CustomClaims } from "@funk/auth/domain/custom-claims"
import { UserRole } from "@funk/auth/domain/user-role"

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
