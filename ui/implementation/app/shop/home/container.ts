import { Component } from "@angular/core"

@Component({
  selector: "shop-home",
  template: `
    <div class="ion-page">
      <ion-header>
        <h2>Shop Home works!</h2>
      </ion-header>
      <ion-content>
        <product-list-container></product-list-container>
        <checkout></checkout>
      </ion-content>
    </div>
  `,
})
export class HomeContainer
{
}
