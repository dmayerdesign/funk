import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { ActionResult, Manager } from '@dannymayer/vex'
import { Cart } from '@funk/shared/contracts/cart/cart'
import { Order } from '@funk/shared/contracts/order/order'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { IdentityApi } from '../identity/api'
import { ShopAction, ShopState } from './model'

@Injectable()
export class ShopApi {
  public cart$ = this._manager.state$.pipe(map(({ cart }) => cart))

  constructor(
    private _manager: Manager<ShopState>,
    private _firestore: AngularFirestore,
    private _identityApi: IdentityApi,
  ) {
    this._identityApi.user$
      .pipe(ignoreNullish())
      .subscribe(
        (user) => {
          console.log('got a user!', user)
          this._firestore.collection('carts')
            .doc<Cart>(user.id)
            .valueChanges()
            .subscribe((cart) => {
              this._manager.dispatch({
                type: 'CART_CHANGE_IN_DB',
                reduce: (state) => ({ ...state, cart }),
              })
            })
        }
      )
  }

  public initShop(): Observable<ActionResult<ShopState>> {
    return this._manager.once({
      // Cache attribute values, taxonomies, etc.
      type: ShopAction.INIT_SHOP,
      reduce: state => state
    })
  }

  public submitOrder(_order: Partial<Order>): Observable<ActionResult<ShopState>> {
    return this._manager.once({
      type: ShopAction.SUBMIT_ORDER,
      resolve: state$ => state$,
    })
  }
}
