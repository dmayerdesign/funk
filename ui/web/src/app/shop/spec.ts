import { createDefaultShopApiStub as createStubbedShopApi, CART_STUB } from '@funk/ui/web/app/shop/stubs'
import { first } from 'rxjs/operators'

describe('shop', () =>
{
  it('should instantiate successfully', () =>
  {
    expect(createStubbedShopApi()).toBeTruthy()
  })

  it('should emit a cart', async (done) =>
  {
    const api = createStubbedShopApi()
    expect(await api.cart$.pipe(first()).toPromise()).toEqual(CART_STUB)
    done()
  })
})
