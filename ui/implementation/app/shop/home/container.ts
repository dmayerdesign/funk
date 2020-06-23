import { Component } from "@angular/core"

@Component({
  selector: "shop-home",
  template: `
    <h2>Shop Home works!</h2>
    <product-list-container></product-list-container>
    <checkout></checkout>
  `,
})
export class HomeContainer
{
}
