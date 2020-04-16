import { HttpClient } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import createDocPath from '@funk/helpers/create-doc-path'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { IdentityApi } from '@funk/ui/core/identity/api'
import { Identity } from '@funk/ui/core/identity/interface'
import { PersistenceApi } from '@funk/ui/core/persistence/api'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { Initializer } from '@funk/ui/helpers/initializer'
import { ignoreNullish } from '@funk/ui/helpers/rxjs-shims'
import { environment } from '@funk/ui/web/environments/environment'
import { Observable } from 'rxjs'
import { map, shareReplay, switchMap, tap } from 'rxjs/operators'

@Injectable()
export class ShopApi implements Initializer
{
  public cart$ = this._identityApi.user$.pipe(
    ignoreNullish(),
    tap(x => console.log('got here 1', x)),
    switchMap((user) => this._persistenceApi
      .queryCollectionForMetadata(ORDERS, (collectionRef) => collectionRef
        .where(createDocPath<Order, Customer>('customer', 'userId'), '==', user.id)
        .where(createDocPath<Order>('status'), '==', Status.CART)
        .limit(1)
      )),
    map(([ metadata ]) => metadata),
    switchMap(({ collectionPath, documentPath }) =>
      this._persistenceApi.listenById(collectionPath, documentPath)
    ),
    tap(x => console.log('got here 2', x)),
    shareReplay(1),
  )

  constructor(
    private _httpClient: HttpClient,
    @Inject(PersistenceApi) private _persistenceApi: Persistence,
    @Inject(IdentityApi) private _identityApi: Identity,
  )
  { }

  public async init(): Promise<void>
  {
    this.cart$.subscribe()
  }

  public submitOrder(order: Partial<Order>): Observable<any>
  {
    return this._httpClient
      .post(`${environment.functionsUrl}/orderSubmit`, order)
  }
}
