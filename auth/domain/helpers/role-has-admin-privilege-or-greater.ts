import { UserRole } from "@funk/auth/domain/user-role"

export default function (role: UserRole): boolean {
  return (
    role === UserRole.ADMINISTRATOR ||
    role === UserRole.OWNER ||
    role === UserRole.SUPER
  )
}
