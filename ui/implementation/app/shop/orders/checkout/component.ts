import { Component, Inject } from "@angular/core"
import { ENTERPRISE } from "@funk/ui/app/shop/tokens"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"
import { pluck } from "rxjs/operators"

@Component({
  selector: "checkout",
  template: `
    <p>Shipping cost strategy: {{ shippingCostStrategy | async }}</p>
  `,
})
export class CheckoutComponent
{
  public shippingCostStrategy = this._enterprise.pipe(pluck("shippingCostStrategy"))

  public constructor(
    @Inject(ENTERPRISE) private _enterprise: Enterprise$
  )
  { }
}
