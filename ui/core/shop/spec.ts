import { createDefaultShopApiStub as createStubbedShopApi } from '@funk/ui/core/shop/stubs'

describe('shop', () =>
{
  it('should instantiate successfully', () =>
  {
    expect(createStubbedShopApi()).toBeTruthy()
  })

  it('should emit a cart', async (done) =>
  {
    const api = createStubbedShopApi()
    const cartObserverSpy = jasmine.createSpy()

    api.init()

    api.cart$.subscribe(cartObserverSpy)
    api.cart$.subscribe(() =>
    {
      expect(cartObserverSpy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
