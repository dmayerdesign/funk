import { createDefaultShopApiStub as createStubbedShopApi } from '@funk/ui/core/shop/stubs'
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
    expect(await api.cart$.pipe(first()).toPromise()).toBeTruthy()
    done()
  })
})
