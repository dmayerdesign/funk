import { Inject, Injectable } from "@angular/core"
import createDocPath from "@funk/helpers/create-doc-path"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import createOrderForCustomer
  from "@funk/model/commerce/order/actions/create-order-for-customer"
import marshall from "@funk/model/commerce/order/actions/marshall"
import setMarshalledSkuQuantity from
  "@funk/model/commerce/order/actions/set-marshalled-sku-quantity"
import setPopulatedSkuQuantity from
  "@funk/model/commerce/order/actions/set-populated-sku-quantity"
import { Customer } from "@funk/model/commerce/order/customer/customer"
import { Cart, MarshalledCart, ORDERS, PopulatedCart, Status } from
  "@funk/model/commerce/order/order"
import { Sku, SKUS } from "@funk/model/commerce/sku/sku"
import { DeviceStorage, DEVICE_STORAGE } from "@funk/ui/core/device-storage/interface"
import { Identity, IDENTITY } from "@funk/ui/core/identity/interface"
import { Persistence, PERSISTENCE } from "@funk/ui/core/persistence/interface"
import { Orders } from "@funk/ui/core/shop/orders/interface"
import { from } from "rxjs"
import { first, map, shareReplay, switchMap } from "rxjs/operators"

const DEVICE_STORAGE_CART_ID = "cart"

@Injectable()
export class OrdersApi implements Orders
{
  public cart$ = this._identityApi.user$.pipe(
    ignoreNullish(),
    switchMap((user) => !!user.email
      ? from(this._persistence.queryCollectionForMetadata(
        ORDERS, (collectionRef) => collectionRef
          .where(createDocPath<Cart, Customer>("customer", "userId"), "==", user.id)
          .where(createDocPath<Cart>("status"), "in",
            [ Status.CART, Status.CART_CHECKOUT ])
          .limit(1)))
        .pipe(
          map(([ metadata ]) => metadata),
          switchMap(({ collectionPath, documentPath }) =>
            this._persistence.listenById<MarshalledCart>(collectionPath, documentPath)),
          switchMap((cart) =>
            this._persistence.populate<PopulatedCart, MarshalledCart>(cart!, [
              { key: "skus", collectionPath: SKUS },
              { key: "discounts", collectionPath: DISCOUNTS },
            ])))
      : from((this._deviceStorage
        .listenById<PopulatedCart>(ORDERS, DEVICE_STORAGE_CART_ID)))),
    shareReplay(1))

  public constructor(
    @Inject(DEVICE_STORAGE) private _deviceStorage: DeviceStorage,
    @Inject(PERSISTENCE) private _persistence: Persistence,
    @Inject(IDENTITY) private _identityApi: Identity
  )
  { }

  public async init(): Promise<void>
  {
    if (!(await this._deviceStorage.getById(ORDERS, DEVICE_STORAGE_CART_ID)))
    {
      const { id, email } = await this._identityApi.user$.pipe(first()).toPromise()
      const cart = createOrderForCustomer({ userId: id, email })
      await this._deviceStorage.setById(ORDERS, DEVICE_STORAGE_CART_ID, cart)
    }
    this.cart$.subscribe()
  }

  public async setSkuQuantityInCart(sku: Sku, quantity: number): Promise<void>
  {
    const _cart = await this.cart$.pipe(first()).toPromise() as PopulatedCart
    // Marshall for storing in database, keep populated for storing in device.
    const populatedCart = { ..._cart } as PopulatedCart
    const marshalledCart = marshall({ ..._cart }) as MarshalledCart

    const updatedPopulatedCart = setPopulatedSkuQuantity(
      populatedCart,
      { sku, quantity }) as PopulatedCart
    const updatedMarshalledCart = setMarshalledSkuQuantity(
      marshalledCart,
      { skuId: sku.id, quantity }) as MarshalledCart

    await this._deviceStorage
      .setById<PopulatedCart>(ORDERS, DEVICE_STORAGE_CART_ID, updatedPopulatedCart)
    await this._persistence
      .setById<MarshalledCart>(ORDERS, marshalledCart.id, updatedMarshalledCart)
  }
}
