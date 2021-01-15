import { InjectionToken } from "@angular/core"
import { GrantSuperRoleToMe } from "@funk/ui/functions/admin/grant-super-role-to-me"
import { GetSecret } from "@funk/ui/functions/admin/get-secret"
import { SetSecret } from "@funk/ui/functions/admin/set-secret"

export const GRANT_SUPER_ROLE_TO_ME = new InjectionToken<GrantSuperRoleToMe>(
  "GRANT_SUPER_ROLE_TO_ME",
)
export const GET_SECRET = new InjectionToken<GetSecret>("GET_SECRET")
export const SET_SECRET = new InjectionToken<SetSecret>("SET_SECRET")
