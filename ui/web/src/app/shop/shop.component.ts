import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Product } from '@funk/shared/contracts/product/product'
import { Observable } from 'rxjs'
import { filter, map, mapTo } from 'rxjs/operators'
import { Vex } from 'ui/state/vex'
import { environment } from '../../environments/environment'
import { HEIGHT_PX } from './shop-navigation.config'
import { ShopAction, ShopState } from './shop.actions'

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
    private _httpClient: HttpClient,
  ) {
    this.products$ = this.manager.resultOf(ShopAction.GET_PRODUCTS).pipe(
      map(({ state }) => state.cart.products)
    )
  }

  public ngOnInit(): void {
    // Side effects (should go first).
    this.manager.resultOf(ShopAction.LOAD_CART)
      .pipe(filter(({ error }) => !error))
      .subscribe(
        (data) => console.log('got success :D', data),
      )

    this.loadCart('order=0')
    this.loadCart('order=1')
    this.loadCart('order=2')
    this.loadCart('order=3')
    this.failToLoadCart()
    this.loadCart('order=4')
    this.doSomething()
  }

  public loadCart(query: string): void {
    return this.manager.dispatch({
      type: ShopAction.LOAD_CART,
      // resolve: () => new Promise((resolve) => setTimeout(resolve, 1000))
      resolve: (state: ShopState) => this._httpClient.get(environment.functionsUrl + '/helloWorld?' + query).pipe(
          mapTo({
            ...state,
            cart: { products: [] }
          })
        )
        .toPromise()
    })
  }

  public failToLoadCart(): void {
    return this.manager.dispatch({
      type: ShopAction.LOAD_CART,
      resolve: (state: ShopState) => this._httpClient.get('/thisWillFail').pipe(
          mapTo(state)
        )
        .toPromise()
    })
  }

  public doSomething(): void {
    return this.manager.dispatch({
      type: ShopAction.GET_PRODUCTS,
      resolve: (state: ShopState) => Promise.resolve({
        ...state,
        foo: 'fooooo'
      })
    })
  }
}
