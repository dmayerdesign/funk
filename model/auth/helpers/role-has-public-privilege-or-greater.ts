import { UserRole } from "@funk/model/auth/user-role"

export default function (role: UserRole): boolean {
  return (
    role === UserRole.PUBLIC ||
    role === UserRole.ADMINISTRATOR ||
    role === UserRole.OWNER ||
    role === UserRole.SUPER
  )
}
