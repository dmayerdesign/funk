import { Identity } from "@funk/ui/core/identity/interface"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { switchMap, map, shareReplay } from "rxjs/operators"
import { from } from "rxjs"
import createDocPath from "@funk/helpers/create-doc-path"
import { ORDERS, Cart, Status, MarshalledCart, PopulatedCart } from
  "@funk/model/commerce/order/order"
import { Customer } from "@funk/model/commerce/order/customer/customer"
import { SKUS } from "@funk/model/commerce/sku/sku"
import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import { construct as constructQueryCollectionForMeta } from
  "@funk/plugins/persistence/actions/query-collection-for-metadata"
import { construct as constructListenById } from
  "@funk/plugins/persistence/actions/listen-by-id"
import { construct as constructPopulate } from
  "@funk/plugins/persistence/actions/populate"

export function construct(
  identity: Identity,
  queryCollectionForMetadata: ReturnType<typeof constructQueryCollectionForMeta>,
  listenById: ReturnType<typeof constructListenById>,
  populate: ReturnType<typeof constructPopulate>
)
{
  const cart$ = identity.user$.pipe(
    ignoreNullish(),
    switchMap((user) =>
      from(queryCollectionForMetadata(ORDERS, (collectionRef) => collectionRef
        .where(createDocPath<Cart, Customer>("customer", "userId"), "==", user.id)
        .where(createDocPath<Cart>("status"), "in", [ Status.CART, Status.CART_CHECKOUT ])
        .limit(1)))
        .pipe(
          map(([ metadata ]) => metadata),
          switchMap(({ collectionPath, documentPath }) =>
            listenById<MarshalledCart>(collectionPath, documentPath)),
          switchMap((cart) =>
            populate<PopulatedCart, MarshalledCart>(cart!, [
              { key: "skus", collectionPath: SKUS },
              { key: "discounts", collectionPath: DISCOUNTS },
            ]))
        )
    ),
    shareReplay(1)
  )
  cart$.subscribe()
  return cart$
}
