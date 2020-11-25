import { Component, Inject } from "@angular/core"
import { ENTERPRISE } from "@funk/ui/app/shop/tokens"
import { Enterprise$ } from "@funk/ui/core/shop/enterprise/enterprise"

@Component({
  selector: "shop",
  template: `
    <ng-template sticky-header-container let-handleContentScroll>
      <ion-header class="header">
        <ion-toolbar class="toolbar max-width-container">
          <ion-title class="title"
            ><managed-content contentId="shop-title"></managed-content
          ></ion-title>
          <ion-buttons class="buttons" slot="primary">
            <ion-button class="button" routerLink="/shop/home"
              >Go Home</ion-button
            >
            <ion-button class="button" routerLink="/shop/checkout"
              >Go to Checkout</ion-button
            >
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ng-container *ngIf="!(enterprise | async)">
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
export class ShopContainer {
  public constructor(@Inject(ENTERPRISE) public enterprise: Enterprise$) {}
}
