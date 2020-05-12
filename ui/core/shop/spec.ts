import { createDefaultShopApiStub } from '@funk/ui/core/shop/stubs'

describe('shop', () =>
{
  it('should instantiate successfully', () =>
  {
    expect(createDefaultShopApiStub()).toBeTruthy()
  })

  it('should emit a cart', async (done) =>
  {
    const api = createDefaultShopApiStub()
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
