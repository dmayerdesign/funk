import { Resolve } from "@angular/router"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"

export function construct(enterprise$: Enterprise$)
{
  return new class ResolveEnterprise implements Resolve<Enterprise$>
  {
    public resolve = () => enterprise$
  }
}

export type ResolveEnterprise = ReturnType<typeof construct>
