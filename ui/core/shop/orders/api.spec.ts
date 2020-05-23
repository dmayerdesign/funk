import { UserRole } from '@funk/model/auth/user-role'
import createOrderForCustomer from '@funk/model/commerce/order/actions/create-order-for-customer'
import marshall from '@funk/model/commerce/order/actions/marshall'
import { MarshalledCart, ORDERS, PopulatedCart } from '@funk/model/commerce/order/order'
import { createFakeMarshalledSku } from '@funk/model/commerce/product/sku/stubs'
import { DeviceStorage } from '@funk/ui/core/device-storage/interface'
import { IdentityStub, USER_UID_STUB } from '@funk/ui/core/identity/stubs'
import { PersistenceStub } from '@funk/ui/core/persistence/stubs'
import { OrdersApi } from '@funk/ui/core/shop/orders/api'
import { first } from 'rxjs/operators'

describe('OrdersApi', () =>
{
  const ORDER_ID = 'order id'
  const setUp = ({
    deviceStorageApi = new PersistenceStub({}),
    persistenceApi = new PersistenceStub(
      {
        [ORDERS]: {
          [ORDER_ID]: createOrderForCustomer({
            email: 'test email',
            userId: USER_UID_STUB,
          }),
        },
      },
      [{
        collectionPath: ORDERS,
        documentPath: ORDER_ID,
      }],
    ),
    identityApi = new IdentityStub(),
  } = {}) => ({
    deviceStorageApi,
    persistenceApi,
    identityApi,
    orderApi: new OrdersApi(
      deviceStorageApi as unknown as DeviceStorage,
      persistenceApi,
      identityApi),
  })

  it('should emit a cart if there is a signed-in user', async (done) =>
  {
    const { orderApi } = setUp()
    const cartObserverSpy = jasmine.createSpy()

    orderApi.cart$.subscribe(cartObserverSpy)
    orderApi.cart$.subscribe(() =>
    {
      expect(cartObserverSpy).toHaveBeenCalledTimes(1)
      done()
    })
  })
  it('should emit a cart if there is NOT a signed-in user', async (done) =>
  {
    const { orderApi } = setUp({
      identityApi: new IdentityStub({ email: undefined, role: UserRole.ANONYMOUS }),
    })
    const cartObserverSpy = jasmine.createSpy()

    orderApi.cart$.subscribe(cartObserverSpy)
    orderApi.cart$.subscribe(() =>
    {
      expect(cartObserverSpy).toHaveBeenCalledTimes(1)
      done()
    })
  })
  it('should add one SKU to the cart', async (done) =>
  {
    const { orderApi, deviceStorageApi, persistenceApi } = setUp()
    const SKU = createFakeMarshalledSku()
    // const createExpectedPopulatedCart = (original: PopulatedCart) => ({
    //   ...original,
    //   skus: [ ...original!.skus, SKU ],
    //   skuQuantityMap: { [SKU.id]: 1 },
    // })
    const createExpectedMarshalledCart = (original: MarshalledCart) => ({
      ...original,
      skus: [ ...original!.skus, SKU.id ],
      skuQuantityMap: { [SKU.id]: 1 },
    })

    spyOn(deviceStorageApi, 'setById')
    spyOn(persistenceApi, 'setById')

    await orderApi.setSkuQuantityInCart(SKU, 1)

    orderApi.cart$.pipe(first()).subscribe((cart) =>
    {
      const populatedCart = cart as PopulatedCart
      const marshalledCart = marshall(cart as PopulatedCart) as MarshalledCart

      // expect(deviceStorageApi.setById).toHaveBeenCalledWith(
      //   ORDERS, expect.any(String), createExpectedPopulatedCart(populatedCart)
      // )
      expect(persistenceApi.setById).toHaveBeenCalledWith(
        ORDERS, expect.any(String), createExpectedMarshalledCart(marshalledCart)
      )
      done()
    })
  })
})
