import { Component } from '@angular/core'
import { ShopApi } from '@funk/ui/core/shop/api'

@Component({
  selector: 'shop',
  template: `
    <ion-toolbar>
      <ion-title>Shop</ion-title>
    </ion-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class ShopContainer
{
  constructor(
    public api: ShopApi,
  )
  { }
}
