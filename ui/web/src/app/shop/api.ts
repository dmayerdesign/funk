import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore'
import { ActionResult, Manager } from '@dannymayer/vex'
import throwPresentableError from '@funk/helpers/throw-presentable-error'
import { Cart } from '@funk/model/commerce/cart/cart'
import { Order } from '@funk/model/commerce/order/order'
import { Product } from '@funk/model/commerce/product/product'
import { UserHydrated } from '@funk/model/user/user-hydrated'
import { ModuleApi } from '@funk/ui/helpers/angular.helpers'
import FirestoreCollectionSource from '@funk/ui/helpers/data-access/firestore-collection-source'
import FirestoreDocumentSource from '@funk/ui/helpers/data-access/firestore-document-source'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { environment } from '../../environments/environment'
import { IdentityApi } from '../identity/api'
import { ShopAction, ShopState } from './model'

@Injectable()
export class ShopApi implements ModuleApi {
  private _cartSource?: FirestoreDocumentSource<Cart>
  public cart$?: Observable<Cart>
  public productsSource = new FirestoreCollectionSource<Product>(
    this._firestore.collection('products')
  )

  constructor(
    private _httpClient: HttpClient,
    private _manager: Manager<ShopState>,
    private _firestore: AngularFirestore,
    private _identityApi: IdentityApi,
  ) { }

  public init(): void {
    this._manager.once({
      type: ShopAction.INIT_SHOP,
      // TODO: Get shop settings. Cache attribute values, taxonomies, etc.
      resolve: state$ => state$,
    })

    this._identityApi.user$
      .pipe(ignoreNullish())
      .subscribe((user) => this.initCart(user))
  }

  public initCart(user: UserHydrated): void {
    if (this._cartSource) this._cartSource.disconnect()

    this._cartSource = new FirestoreDocumentSource<Cart>(
      this._firestore.collection('carts').doc(user.id),
      (cart) => cart && this._manager.dispatch({
        type: ShopAction.CART_CHANGE_FROM_DB,
        reduce: (state) => ({ ...state, cart }),
      })
    )
    this.cart$ = this._cartSource.connect().pipe(ignoreNullish())

    // TESTING
    this.submitOrder({}).subscribe(
      (x) => console.log('submitted order', x),
    )
    throwPresentableError(new Error('moo!'))
    // [END] TESTING
  }

  public submitOrder(order: Partial<Order>): Observable<ActionResult<ShopState>> {
    return this._manager.once({
      type: ShopAction.SUBMIT_ORDER,
      resolve: (state$) => this._httpClient
        .post(`${environment.functionsUrl}/orderSubmit`, order)
        .pipe(switchMap(() => state$))
    })
  }
}
