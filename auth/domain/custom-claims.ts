import { UserRole } from "@funk/auth/domain/user-role"

export interface CustomClaims {
  role: UserRole
}
