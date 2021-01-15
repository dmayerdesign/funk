import { InjectionToken } from "@angular/core"
import { ResolveEnterprise } from "@funk/ui/app/shop/enterprise/resolve-enterprise"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"

export const ENTERPRISE = new InjectionToken<Enterprise$>("ENTERPRISE")
export const RESOLVE_ENTERPRISE = new InjectionToken<ResolveEnterprise>(
  "RESOLVE_ENTERPRISE",
)
