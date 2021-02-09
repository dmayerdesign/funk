import { Cart, MarshalledCart } from "@funk/commerce/order/model/order"
import { construct } from "@funk/commerce/shop/application/external/orders/cart/cart"
import { createFakePerson } from "@funk/identity/application/external/stubs"
import { UserSession } from "@funk/identity/application/external/user-session"
import { ListenById } from "@funk/persistence/application/external/behaviors/listen-by-id"
import { Populate } from "@funk/persistence/application/external/behaviors/populate"
import { QueryCollectionForMetadata } from "@funk/persistence/application/external/behaviors/query-collection-for-metadata"
import { of } from "rxjs"

describe("Cart$", () => {
  let userSession: UserSession
  let queryCollectionForMetadata: QueryCollectionForMetadata
  let listenById: ListenById
  let populate: Populate<Cart, MarshalledCart>
  const COLLECTION_PATH = "collection path"
  const DOCUMENT_PATH = "doc path"
  const CART = ({} as unknown) as Cart

  beforeEach(() => {
    userSession = of({ person: createFakePerson() }) as UserSession
    queryCollectionForMetadata = jest.fn().mockReturnValue(
      Promise.resolve([
        {
          collectionPath: COLLECTION_PATH,
          documentPath: DOCUMENT_PATH,
        },
      ]),
    )
    listenById = jest.fn().mockReturnValue(of(CART))
    populate = jest.fn().mockReturnValue(Promise.resolve(CART))
  })

  it("should emit a cart, given that the user has a cart", async () => {
    const cart = construct(
      userSession,
      queryCollectionForMetadata,
      listenById,
      populate,
    )
    const cartObserverSpy = jest.fn()

    cart.subscribe(cartObserverSpy)
    cart.subscribe(() => {
      expect(cartObserverSpy).toHaveBeenCalledTimes(1)
    })
  })
})
