import { IdentityStub } from "@funk/ui/core/identity/stubs"
import { construct } from "@funk/ui/core/shop/orders/cart/cart"
import { Identity } from "@funk/ui/core/identity/interface"
import { construct as constructQueryCollectionForMeta }
  from "@funk/plugins/persistence/actions/query-collection-for-metadata"
import { construct as constructListenById }
  from "@funk/plugins/persistence/actions/listen-by-id"
import { construct as constructPopulate }
  from "@funk/plugins/persistence/actions/populate"
import { UserRole } from "@funk/model/auth/user-role"
import { Cart } from "@funk/model/commerce/order/order"

describe("cart", () =>
{
  let identity: Identity
  let queryCollectionForMetadata: ReturnType<typeof constructQueryCollectionForMeta>
  let listenById: ReturnType<typeof constructListenById>
  let populate: ReturnType<typeof constructPopulate>
  const COLLECTION_PATH = "collection path"
  const DOCUMENT_PATH = "doc path"
  const CART = {} as unknown as Cart

  beforeEach(() =>
  {
    identity = new IdentityStub()
    queryCollectionForMetadata = jasmine.createSpy().and.returnValue(
      Promise.resolve([{
        collectionPath: COLLECTION_PATH,
        documentPath: DOCUMENT_PATH,
      }])
    )
    listenById = jasmine.createSpy().and.returnValue(Promise.resolve(CART))
    populate = jasmine.createSpy().and.returnValue(Promise.resolve(CART))
  })

  it("should emit a cart if there is a signed-in user", async (done) =>
  {
    const cart = construct(
      identity,
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
  it("should emit a cart if there is NOT a signed-in user", async (done) =>
  {
    const cart = construct(
      new IdentityStub({ email: undefined, role: UserRole.ANONYMOUS }),
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

