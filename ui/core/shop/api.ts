import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { ActionResult, Manager } from '@dannymayer/vex'
import createDocPath from '@funk/helpers/create-doc-path'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { ShopAction, ShopState } from '@funk/ui/core/shop/model'
import { Initializer } from '@funk/ui/helpers/angular.helpers'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { environment } from '@funk/ui/web/environments/environment'
import { Observable } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Injectable()
export class ShopApi implements Initializer
{
  public cart$ = this._identityApi.user$.pipe(
    ignoreNullish(),
    switchMap((user) => this._persistenceApi
      .queryCollectionForMetadata(ORDERS, (collectionRef) => collectionRef
        .where(createDocPath<Order, Customer>('customer', 'userId'), '==', user.id)
        .where(createDocPath<Order>('status'), '==', Status.CART)
        .limit(1)
      )),
    map((metadata) => metadata[0].path),
    switchMap((docPath) =>
      this._persistenceApi.document(docPath).valueChanges(),
    ),
  )

  constructor(
    private _httpClient: HttpClient,
    private _manager: Manager<ShopState>,
    @Inject(PersistenceApi) private _persistenceApi: Persistence,
    @Inject(IdentityApi) private _identityApi: Identity,
  )
  { }

  public async init(): Promise<void>
  {
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
