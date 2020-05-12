import { Inject, Injectable } from '@angular/core'
import createDocPath from '@funk/helpers/create-doc-path'
import { ignoreNullish } from '@funk/helpers/rxjs-shims'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Cart, Order, ORDERS, Status } from '@funk/model/commerce/order/order'
import { Identity, IDENTITY } from '@funk/ui/core/identity/interface'
import { Persistence, PERSISTENCE } from '@funk/ui/core/persistence/interface'
import { Initializer } from '@funk/ui/helpers/initializer'
import { map, shareReplay, switchMap } from 'rxjs/operators'

@Injectable()
export class ShopApi implements Initializer
{
  public cart$ = this._identityApi.user$.pipe(
    ignoreNullish(),
    switchMap((user) => this._persistenceApi
      .queryCollectionForMetadata(ORDERS, (collectionRef) => collectionRef
        .where(createDocPath<Order, Customer>('customer', 'userId'), '==', user.id)
        .where(createDocPath<Order>('status'), 'in',
          [ Status.CART, Status.CART_CHECKOUT ])
        .limit(1))),
    map(([ metadata ]) => metadata),
    switchMap(({ collectionPath, documentPath }) =>
      this._persistenceApi.listenById<Cart>(collectionPath, documentPath)),
    shareReplay(1))

  constructor(
    @Inject(PERSISTENCE) private _persistenceApi: Persistence,
    @Inject(IDENTITY) private _identityApi: Identity,
  )
  { }

  public async init(): Promise<void>
  {
    this.cart$.subscribe()
  }

  public submitOrder(_order: Partial<Order>): void
  {
    // TODO: implement.
  }
}
