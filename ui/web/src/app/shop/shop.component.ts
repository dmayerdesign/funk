import { Component, OnInit } from '@angular/core'
import { Vex } from '@dannymayer/vex'
import { CollectionSource } from '@funk/ui/helpers/ui-component.helpers'
import { map } from 'rxjs/operators'
import { HEIGHT_PX } from './shop-navigation.config'
import { ShopApi } from './shop.api'
import { ShopAction, ShopState } from './shop.model'

@Component({
  template: `
    <nav class="mat-elevation-z10">
      <button mat-button [matMenuTriggerFor]="menu">Menu</button>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>Item 1</button>
        <button mat-menu-item>Item 2</button>
      </mat-menu>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav button {
      padding-top: ${HEIGHT_PX / 3}px;
      padding-bottom: ${HEIGHT_PX / 3}px;
      line-height: ${HEIGHT_PX / 3}px;
      overflow: visible;
      white-space: normal;
    }
  `],
})
export class ShopComponent implements OnInit {
  public productsSource = new CollectionSource(this.manager
    .resultOf(ShopAction.GET_PRODUCTS)
    .pipe(map(({ state }) => state.cart.products)))

  constructor(
    public manager: Vex<ShopState>,
    public api: ShopApi,
  ) { }

  public ngOnInit(): void {
    this.api.loadCart()
    this.api.failToLoadCart()
    this.manager.resultOf(ShopAction.LOAD_CART)
      .subscribe(
        (data) => console.log('got something!', data),
      )
  }
}
