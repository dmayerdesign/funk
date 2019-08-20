import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Vex } from '@dannymayer/vex'
import { Product } from '@funk/shared/contracts/product/product'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { ShopAction, ShopState } from './shop.model'

@Injectable()
export class ShopApi {
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

  public loadCart(query?: string): void {
    return this.manager.dispatch({
      type: ShopAction.LOAD_CART,
      resolve: () => this._httpClient.get(environment.functionsUrl + '/helloWorld?' + query),
      mapToState: (state) => ({
        ...state,
        cart: { products: [] }
      }),
    })
  }

  public failToLoadCart(): void {
    return this.manager.dispatch({
      type: ShopAction.LOAD_CART,
      resolve: () => this._httpClient.get('/thisWillFail'),
      mapToState: (state) => state,
    })
  }

  public doSomething(): void {
    return this.manager.dispatch({
      type: ShopAction.GET_PRODUCTS,
      resolve: (state: ShopState) => ({
        ...state,
        foo: 'fooooo'
      })
    })
  }
}
