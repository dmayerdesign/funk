import { Cart, MarshalledCart } from "@funk/model/commerce/order/order"
import { createFakePerson } from "@funk/ui/core/identity/stubs"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { construct } from "@funk/ui/core/shop/orders/cart/cart"
import { ListenById } from "@funk/ui/plugins/persistence/behaviors/listen-by-id"
import { Populate } from "@funk/ui/plugins/persistence/behaviors/populate"
import { QueryCollectionForMetadata } from "@funk/ui/plugins/persistence/behaviors/query-collection-for-metadata"
import { of } from "rxjs"

describe("Cart$", () =>
{
  let userSession: UserSession
  let queryCollectionForMetadata: QueryCollectionForMetadata
  let listenById: ListenById
  let populate: Populate<Cart, MarshalledCart>
  const COLLECTION_PATH = "collection path"
  const DOCUMENT_PATH = "doc path"
  const CART = {} as unknown as Cart

  beforeEach(() =>
  {
    userSession = of({ person: createFakePerson() }) as UserSession
    queryCollectionForMetadata = jest.fn().mockReturnValue(
      Promise.resolve([{
        collectionPath: COLLECTION_PATH,
        documentPath: DOCUMENT_PATH,
      }])
    )
    listenById = jest.fn().mockReturnValue(of(CART))
    populate = jest.fn().mockReturnValue(Promise.resolve(CART))
  })

  it("should emit a cart, given that the user has a cart", async function ()
  {
    const cart = construct(
      userSession,
      queryCollectionForMetadata,
      listenById,
      populate)
    const cartObserverSpy = jest.fn()

    cart.subscribe(cartObserverSpy)
    cart.subscribe(() =>
    {
      expect(cartObserverSpy).toHaveBeenCalledTimes(1)
    })
  })
})

