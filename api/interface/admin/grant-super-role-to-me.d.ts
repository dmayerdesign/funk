import { authAdmin as authAdminImpl } from "@funk/plugins/auth/auth-admin"

export function construct(authAdmin: typeof authAdminImpl): typeof grantSuperRoleToMe

export default function grantSuperRoleToMe(): Promise<void>

export type GrantSuperRoleToMe = typeof grantSuperRoleToMe
