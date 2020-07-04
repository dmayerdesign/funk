import { authAdmin as authAdminImpl } from "@funk/plugins/auth/auth-admin"
import { UserRecord } from "@funk/plugins/auth/user-record"

export function construct(authAdmin?: typeof authAdminImpl): typeof setRoleForNewUser

export default function setRoleForNewUser(user: UserRecord): Promise<any>

export type SetRoleForNewUser = ReturnType<typeof construct>
