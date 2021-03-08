import { Customer } from "@funk/commerce/customer/model/customer"
import { DISCOUNTS } from "@funk/commerce/discount/model/discount"
import { Cart, ORDERS, Status } from "@funk/commerce/order/model/order"
import { SKUS } from "@funk/commerce/sku/model/sku"
import createDocPath from "@funk/helpers/create-doc-path"
import { ignoreNullish } from "@funk/helpers/rxjs-shims"
import { UserSession } from "@funk/identity/application/external/user-session"
import { ListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Populate } from "@funk/persistence/application/external/behaviors/populate"
import { QueryCollectionForMetadata } from "@funk/persistence/application/external/behaviors/query-collection-for-metadata"
import { from } from "rxjs"
import { map, shareReplay, switchMap } from "rxjs/operators"

export function construct(
  userSession: UserSession,
  queryCollectionForMetadata: QueryCollectionForMetadata,
  listenById: ListenById,
  populate: Populate<Cart>,
) {
  const cart$ = userSession.pipe(
    ignoreNullish(),
    switchMap(({ person }) =>
      from(
        queryCollectionForMetadata(ORDERS, (collectionRef) =>
          collectionRef
            .where(
              createDocPath<Cart, Customer>("customer", "userId"),
              "==",
              person.id,
            )
            .where(createDocPath<Cart>("status"), "in", [
              Status.CART,
              Status.CART_CHECKOUT,
            ])
            .limit(1),
        ),
      ).pipe(
        map(([metadata]) => metadata),
        switchMap(({ collectionPath, documentPath }) =>
          listenById<Cart>(collectionPath, documentPath),
        ),
        switchMap((cart) =>
          populate(cart!, [
            { key: "skus", collectionPath: SKUS },
            { key: "discounts", collectionPath: DISCOUNTS },
          ]),
        ),
      ),
    ),
    shareReplay(1),
  )
  cart$.subscribe()
  return cart$
}

export type Cart$ = ReturnType<typeof construct>
