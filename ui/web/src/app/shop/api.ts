import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { ActionResult, Manager } from '@dannymayer/vex'
import { Cart } from '@funk/model/commerce/cart/cart'
import { Order } from '@funk/model/commerce/order/order'
import { UserConfig } from '@funk/model/user/user-config'
import throwPresentableError from '@funk/helpers/throw-presentable-error'
import { ModuleApi } from '@funk/ui/helpers/angular.helpers'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { Observable, Subscription } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { IdentityApi } from '../identity/api'
import { ShopAction, ShopState } from './model'

@Injectable()
export class ShopApi implements ModuleApi {
  public cart$ = this._manager.state$.pipe(map(({ cart }) => cart))
  private _cartSubscription: Subscription

  constructor(
    private _httpClient: HttpClient,
    private _manager: Manager<ShopState>,
    private _firestore: AngularFirestore,
    private _identityApi: IdentityApi,
  ) { }

  public init(): void {
    // Get shop settings.
    // Cache attribute values, taxonomies, etc.
    this._manager.once({
      type: ShopAction.INIT_SHOP,
      reduce: state => state
    })

    // Create a new `cart` subscription.
    this._identityApi.user$
      .pipe(ignoreNullish())
      .subscribe((user) => this.initCart(user))
  }

  public initCart(user: UserConfig): void {

    // TESTING
    this.submitOrder({}).subscribe(
      (x) => console.log('submitted order', x),
    )
    throwPresentableError(new Error('moo!'))
    // [END] TESTING

    if (this._cartSubscription) this._cartSubscription.unsubscribe()
    this._cartSubscription = this._firestore.collection('carts')
      .doc<Cart>(user.id)
      .valueChanges()
      .pipe(ignoreNullish())
      .subscribe((cart) => this._updateCart(cart))
  }

  public submitOrder(order: Partial<Order>): Observable<ActionResult<ShopState>> {
    return this._manager.once({
      type: ShopAction.SUBMIT_ORDER,
      resolve: (state$) => this._httpClient
        .post(`${environment.functionsUrl}/submitOrder`, order)
        .pipe(
          withLatestFrom(state$),
          map(([ _response, state ]) => state),
        )
    })
  }

  private _updateCart(cart: Cart): void {
    this._manager.dispatch({
      type: 'CART_CHANGE_IN_DB',
      reduce: (state) => ({ ...state, cart }),
    })
  }
}
