import { Component, Inject } from "@angular/core"
import { ENTERPRISE } from "@funk/ui/app/shop/tokens"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"

@Component({
  selector: "shop",
  template: `
    <ng-container *ngIf="!(enterprise | async)">
      <ion-progress-bar type="indeterminate"></ion-progress-bar>
    </ng-container>
    <router-outlet></router-outlet>
  `,
})
export class ShopContainer
{
  public constructor(
    @Inject(ENTERPRISE) public enterprise: Enterprise$
  )
  { }
}
