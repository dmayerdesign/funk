import { InjectionToken } from "@angular/core"
import { Enterprise$ } from "@funk/commerce/shop/application/external/enterprise/enterprise"
import { ResolveEnterprise } from "@funk/commerce/shop/infrastructure/external/enterprise/resolve-enterprise"

export const ENTERPRISE = new InjectionToken<Enterprise$>("ENTERPRISE")
export const RESOLVE_ENTERPRISE = new InjectionToken<ResolveEnterprise>(
  "RESOLVE_ENTERPRISE",
)
