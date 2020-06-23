import { Resolve } from "@angular/router"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"
import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { firstValueFrom } from "rxjs"

export function construct(enterprise$: Enterprise$)
{
  return new class ResolveEnterprise implements Resolve<Enterprise>
  {
    public resolve(): Promise<Enterprise>
    {
      return firstValueFrom(enterprise$)
    }
  }
}

export type ResolveEnterprise = ReturnType<typeof construct>
