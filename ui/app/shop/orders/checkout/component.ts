import { Component, Inject } from "@angular/core"
import { ENTERPRISE } from "@funk/ui/app/shop/tokens"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"
import { pluck } from "rxjs/operators"

@Component({
  selector: "checkout",
  // template: `
  //   <ion-content
  //     [ngClass]="{ 'ion-padding': false }"
  //     [scrollEvents]="true"
  //     (ionScroll)="handleContentScroll($event)">

  //     <h3>Checkout works!</h3>
  //     <p>Shipping cost strategy: {{ shippingCostStrategy | async }}</p>

  //   </ion-content>
  // `,
  template: `
    <ion-card>

      <h3>Checkout works!</h3>
      <p>Shipping cost strategy: {{ shippingCostStrategy | async }}</p>

    </ion-card>
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
