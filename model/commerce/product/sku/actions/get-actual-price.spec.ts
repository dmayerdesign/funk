import { construct } from '@funk/model/commerce/product/sku/actions/get-actual-price'

describe('getActualPrice', () =>
{
  it('should construct', () =>
  {
    expect(construct({})).toBeTruthy()
  })
})
