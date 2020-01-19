import { createDefaultShopApiStub, CART_STUB } from '@funk/ui/web/app/shop/stubs'
import { first } from 'rxjs/operators'

describe('shop', () =>
{
  it('should instantiate successfully', () =>
  {
    expect(createDefaultShopApiStub()).toBeTruthy()
  })

  it('should emit a cart', async (done) =>
  {
    const api = createDefaultShopApiStub()
    expect(await api.cart$.pipe(first()).toPromise()).toEqual(CART_STUB)
    done()
  })
})
