import { Resolve } from "@angular/router"
import { asPromise } from '@funk/helpers/as-promise'
import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"

export function construct(enterprise$: Enterprise$) {
  return new (class ResolveEnterprise implements Resolve<Enterprise> {
    public resolve(): Promise<Enterprise> {
      return asPromise(enterprise$)
    }
  })()
}

export type ResolveEnterprise = ReturnType<typeof construct>
