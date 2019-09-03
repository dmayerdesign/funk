import { Injectable } from '@angular/core'
import { ActionResult, Manager } from '@dannymayer/vex'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ShopAction, ShopState } from './model'

@Injectable()
export class Api {
  public cart$ = this._manager.state$.pipe(map(({ cart }) => cart))

  constructor(
    private _manager: Manager<ShopState>,
  ) { }

  public initShop(): any {
    // Cache attribute values, taxonomies, etc.
  }

  public initCart(): Observable<ActionResult<ShopState>> {
    return this._manager.once({
      type: ShopAction.LOAD_CART,
      resolve: (state$) => state$.pipe(
        map((state) => ({
          ...state,
          cart: {
            products: []
          }
        }))
      )
    })
  }
}
