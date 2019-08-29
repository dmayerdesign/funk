import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Action, Manager } from '@dannymayer/vex'
import { Product } from '@funk/shared/contracts/product/product'
import { of, Observable } from 'rxjs'
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { ShopAction, ShopState } from './shop.model'

@Injectable()
export class ShopApi {

  constructor(
    public manager: Manager<ShopState>,
    private _httpClient: HttpClient,
  ) { }

  public loadCart(query?: string): Observable<ShopState> {
    const action: Action<ShopState> = {
      type: ShopAction.LOAD_CART,
      resolve: (state$) => this._httpClient
        .get(environment.functionsUrl + '/helloWorld?' + query)
        .pipe(withLatestFrom(state$, (_responseBody, state) => ({
          ...state,
          cart: {
            ...state.cart,
            products: [
              ...state.cart.products,
              { name: 'Product' } as Product,
            ]
          }
        })))
    }
    return this.manager.once(action).pipe(map(({ state }) => state))
  }

  public failToLoadCart(): void {
    return this.manager.dispatch({
      type: ShopAction.LOAD_CART,
      resolve: (state$) => state$.pipe(
        switchMap((state) => this._httpClient.get<ShopState>('/thisWillFail').pipe(
          // Swallow the error!
          catchError((error) => {
            console.log('caught the error!', error)
            return of(state)
          })
        )),
      ),
    })
  }

  public doSomething(): void {
    return this.manager.dispatch({
      type: ShopAction.GET_PRODUCTS,
      reduce: (state: ShopState) => ({
        ...state,
        foo: 'fooooo'
      })
    })
  }
}
