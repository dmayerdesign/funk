import { InjectionToken } from "@angular/core"
import { construct as constructResolveEnterprise } from
  "@funk/ui/app/shop/enterprise/resolve-enterprise"
import { construct as constructEnterprise } from
  "@funk/ui/core/shop/enterprise/enterprise"

export const ENTERPRISE = new InjectionToken<ReturnType<typeof constructEnterprise>>("ENTERPRISE")
export const RESOLVE_ENTERPRISE =
  new InjectionToken<ReturnType<typeof constructResolveEnterprise>>("RESOLVE_ENTERPRISE")
