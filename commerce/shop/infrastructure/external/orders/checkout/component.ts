import { Component, Inject } from "@angular/core"
import { Enterprise$ } from "@funk/commerce/shop/application/external/enterprise/enterprise"
import { ENTERPRISE } from "@funk/commerce/shop/infrastructure/external/tokens"
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
    <ion-card class="card">
      <h3>Checkout works!</h3>
      <p>Shipping cost strategy: {{ shippingCostStrategy | async }}</p>
    </ion-card>
  `,
})
export class CheckoutComponent {
  public shippingCostStrategy = this._enterprise.pipe(
    pluck("shippingCostStrategy"),
  )

  public constructor(@Inject(ENTERPRISE) private _enterprise: Enterprise$) {}
}
