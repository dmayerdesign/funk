import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ActionResult, Manager } from '@dannymayer/vex'
import createDocPath from '@funk/helpers/create-doc-path'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { ShopAction, ShopState } from '@funk/ui/core/shop/model'
import { StoreApi } from '@funk/ui/core/store/api'
import { Initializer } from '@funk/ui/helpers/angular.helpers'
import FirestoreCollectionSource from '@funk/ui/helpers/data-access/firestore-collection-source'
import FirestoreDocumentSource from '@funk/ui/helpers/data-access/firestore-document-source'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { environment } from '@funk/ui/web/environments/environment'
import { Observable } from 'rxjs'
import { map, scan, switchMap } from 'rxjs/operators'

@Injectable()
export class ShopApi implements Initializer
{
  public cart$ = this._identityApi.user$.pipe(
    ignoreNullish(),
    switchMap((user) => this._store
      .queryCollectionForMetadata(ORDERS, (collectionRef) => collectionRef
        .where(createDocPath<Order, Customer>('customer', 'userId'), '==', user.id)
        .where(createDocPath<Order>('status'), '==', Status.CART)
        .limit(1)
      )),
    map((metadata) => metadata[0].path),
    scan((previousSource, docPath) =>
    {
      if (previousSource)
      {
        previousSource.disconnect()
      }
      return new FirestoreDocumentSource<Order>(
        this._store.document(docPath),
        (cart) => cart && this._manager.dispatch({
          type: ShopAction.CART_CHANGE_FROM_DB,
          reduce: (state) => ({ ...state, cart }),
        }),
      )
    }, undefined as FirestoreDocumentSource<Order> | undefined),
    ignoreNullish(),
    switchMap((cartSource) => cartSource.connect().pipe(ignoreNullish())),
  )
  public productsSource = new FirestoreCollectionSource<Product>(
    this._store.collection(PRODUCTS),
  )

  constructor(
    private _httpClient: HttpClient,
    private _manager: Manager<ShopState>,
    private _store: StoreApi,
    private _identityApi: IdentityApi,
  )
  {
    this.init()
  }

  public async init(): Promise<void>
  {
    console.log('init shop')
    this._manager.once({
      type: ShopAction.INIT_SHOP,
      // TODO: Get shop settings. Cache attribute values, taxonomies, etc.
      resolve: state$ => state$,
    })
  }

  public submitOrder(order: Partial<Order>): Observable<ActionResult<ShopState>>
  {
    return this._manager.once({
      type: ShopAction.SUBMIT_ORDER,
      resolve: (state$) => this._httpClient
        .post(`${environment.functionsUrl}/orderSubmit`, order)
        .pipe(switchMap(() => state$)),
    })
  }
}
