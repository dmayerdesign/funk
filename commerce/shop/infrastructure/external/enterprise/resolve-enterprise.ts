import { Resolve } from "@angular/router"
import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import { Enterprise$ } from "@funk/commerce/shop/application/external/enterprise/enterprise"
import { asPromise } from "@funk/helpers/as-promise"

export function construct(enterprise$: Enterprise$) {
  return new (class ResolveEnterprise implements Resolve<Enterprise> {
    public resolve(): Promise<Enterprise> {
      return asPromise(enterprise$)
    }
  })()
}

export type ResolveEnterprise = ReturnType<typeof construct>
