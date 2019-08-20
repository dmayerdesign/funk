import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Vex } from '@dannymayer/vex'
import { environment } from '../../environments/environment'
import { ShopAction, ShopState } from './shop.model'

@Injectable()
export class ShopApi {

  constructor(
    public manager: Vex<ShopState>,
    private _httpClient: HttpClient,
  ) { }

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
