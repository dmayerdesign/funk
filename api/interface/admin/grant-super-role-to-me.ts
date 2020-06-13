import { authAdmin as authAdminImpl } from "@funk/plugins/auth/auth-admin"

export declare function construct(authAdmin: typeof authAdminImpl): typeof grantSuperRoleToMe

declare function grantSuperRoleToMe(): Promise<void>
export default grantSuperRoleToMe

export type GrantSuperRoleToMe = typeof grantSuperRoleToMe
