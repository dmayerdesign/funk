import { Order, ORDERS } from '@funk/model/commerce/order/order'
import { OrderApi } from '@funk/ui/core/shop/order/api'
import { DeviceStorage } from '../../device-storage/interface'
import { PersistenceStub } from '../../persistence/stubs'

describe('OrderApi', () =>
{
  const setUp = ({
    deviceStorageApi,
    persistenceApi,
  } = {
    deviceStorageApi: {
      upsert: jasmine.createSpy(),
    },
    persistenceApi: new PersistenceStub({}),
  }) => ({
    deviceStorageApi,
    persistenceApi,
    orderApi: new OrderApi(deviceStorageApi as unknown as DeviceStorage, persistenceApi),
  })

  it('should persist an order in device storage for a user with no known email', () =>
  {
    const { orderApi, deviceStorageApi, persistenceApi } = setUp()
    const USER = { id: 'user id' }
    spyOn(persistenceApi, 'setById')

    orderApi.createOrderForUser(USER)

    expect(persistenceApi.setById).not.toHaveBeenCalled()
    expect(deviceStorageApi.upsert).toHaveBeenCalledWith(
      expect.stringContaining(ORDERS),
      expect.objectContaining<Partial<Order>>({
        customer: { userId: USER.id },
      }))
  })
  it('should persist an order in the data store for a user with a known email', () =>
  {
    const { orderApi, deviceStorageApi, persistenceApi } = setUp()
    const USER = { id: 'user id', email: 'test email' }
    spyOn(persistenceApi, 'setById')

    orderApi.createOrderForUser(USER)

    expect(deviceStorageApi.upsert).not.toHaveBeenCalled()
    expect(persistenceApi.setById).toHaveBeenCalledWith(
      expect.stringContaining(ORDERS),
      expect.any(String),
      expect.objectContaining<Partial<Order>>({
        customer: { userId: USER.id, email: USER.email },
      }))
  })
})
