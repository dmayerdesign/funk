import { Component, OnInit } from '@angular/core'
import { Vex } from '@dannymayer/vex'
import { Product } from '@funk/shared/contracts/product/product'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
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
  public products$: Observable<Product[]>

  constructor(
    // Corresponds to the StateModule we imported in shop.module.
    public manager: Vex<ShopState>,
    public api: ShopApi,
  ) {
    this.products$ = this.manager.resultOf(ShopAction.GET_PRODUCTS).pipe(
      map(({ state }) => state.cart.products)
    )
  }

  public ngOnInit(): void {
    this.api.loadCart()
    this.api.failToLoadCart()
    this.manager.resultOf(ShopAction.LOAD_CART)
      .pipe(filter(({ error }) => !error))
      .subscribe(
        (data) => console.log('got success :D', data),
      )
  }
}
