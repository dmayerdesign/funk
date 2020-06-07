import { construct } from "@funk/ui/app/shop/orders/cart/cart"
import { construct as constructQueryCollectionForMeta }
  from "@funk/plugins/persistence/actions/query-collection-for-metadata"
import { construct as constructListenById }
  from "@funk/plugins/persistence/actions/listen-by-id"
import { construct as constructPopulate }
  from "@funk/plugins/persistence/actions/populate"
import { Cart } from "@funk/model/commerce/order/order"
import UserSession from "@funk/ui/app/identity/user-session"
import { of } from "rxjs"
import { createFakePerson } from "@funk/ui/app/identity/stubs"

describe("cart", () =>
{
  let userSession: UserSession
  let queryCollectionForMetadata: ReturnType<typeof constructQueryCollectionForMeta>
  let listenById: ReturnType<typeof constructListenById>
  let populate: ReturnType<typeof constructPopulate>
  const COLLECTION_PATH = "collection path"
  const DOCUMENT_PATH = "doc path"
  const CART = {} as unknown as Cart

  beforeEach(() =>
  {
    userSession = of({ person: createFakePerson() }) as UserSession
    queryCollectionForMetadata = jasmine.createSpy().and.returnValue(
      Promise.resolve([{
        collectionPath: COLLECTION_PATH,
        documentPath: DOCUMENT_PATH,
      }])
    )
    listenById = jasmine.createSpy().and.returnValue(Promise.resolve(CART))
    populate = jasmine.createSpy().and.returnValue(Promise.resolve(CART))
  })

  it("should emit a cart", async (done) =>
  {
    const cart = construct(
      userSession,
      queryCollectionForMetadata,
      listenById,
      populate)
    const cartObserverSpy = jasmine.createSpy()

    cart.subscribe(cartObserverSpy)
    cart.subscribe(() =>
    {
      expect(cartObserverSpy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})

