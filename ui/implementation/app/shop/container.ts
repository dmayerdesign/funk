import { Component, Inject } from "@angular/core"
import { ENTERPRISE } from "@funk/ui/app/shop/tokens"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"

@Component({
  selector: "shop",
  template: `
    <ng-template
      transparent-header-container
      let-handleContentScroll>

      <ion-header>
        <ion-toolbar class="max-width-container">
          <ion-title>Shop</ion-title>
          <ion-buttons slot="primary">
            <ion-button routerLink="/shop/home">Go Home</ion-button>
            <ion-button routerLink="/shop/checkout">Go to Checkout</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ng-container *ngIf="!(enterprise | async)">
        <ion-progress-bar type="indeterminate"></ion-progress-bar>
      </ng-container>

      <ion-content
        [scrollEvents]="true"
        (ionScroll)="handleContentScroll($event)">
        <ion-router-outlet [animated]="true"></ion-router-outlet>
      </ion-content>
    </ng-template>
  `,
})
export class ShopContainer
{
  public constructor(
    @Inject(ENTERPRISE) public enterprise: Enterprise$
  )
  { }
}
