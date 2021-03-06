import { Component, Inject, OnDestroy } from "@angular/core"
import { Enterprise$ } from "@funk/commerce/shop/application/external/enterprise/enterprise"
import { Cart$ } from "@funk/commerce/shop/application/external/orders/cart/cart"
import { CART } from "@funk/commerce/shop/infrastructure/external/orders/tokens"
import { ENTERPRISE } from "@funk/commerce/shop/infrastructure/external/tokens"
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy"
import { map, shareReplay } from "rxjs/operators"

@UntilDestroy()
@Component({
  selector: "shop",
  template: `
    <ng-template sticky-header-container let-handleContentScroll>
      <ion-header class="header">
        <ion-toolbar class="toolbar max-width-container">
          <ion-title class="title"
            ><content contentId="shop-title"></content
          ></ion-title>
          <ion-buttons class="buttons" slot="primary">
            <ion-button class="button" routerLink="/shop/home"
              >Go Home</ion-button
            >
            <ion-button
              class="button checkout-button"
              routerLink="/shop/checkout"
              >Go to Checkout ({{ cartCount$ | async }})</ion-button
            >
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ng-container *ngIf="!(enterprise$ | async)">
        <ion-progress-bar
          class="progress-bar"
          type="indeterminate"
        ></ion-progress-bar>
      </ng-container>

      <ion-content
        class="content"
        [scrollEvents]="true"
        (ionScroll)="handleContentScroll($event)"
      >
        <ion-router-outlet
          class="router-outlet"
          [animated]="true"
        ></ion-router-outlet>
      </ion-content>
    </ng-template>
  `,
})
export class ShopContainer implements OnDestroy {
  public cartCount$ = this.cart$.pipe(
    untilDestroyed(this),
    map((cart) =>
      Object.keys(cart.skuQuantityMap).reduce(
        (count, key) => count + cart.skuQuantityMap[key],
        0,
      ),
    ),
    shareReplay(1),
  )

  public constructor(
    @Inject(ENTERPRISE) public enterprise$: Enterprise$,
    @Inject(CART) public cart$: Cart$,
  ) {
    this.cartCount$.subscribe()
  }

  public ngOnDestroy(): void {}
}
