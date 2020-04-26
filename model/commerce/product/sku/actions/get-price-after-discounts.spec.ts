import { construct } from '@funk/model/commerce/product/sku/actions/get-price-after-discounts'

xdescribe('getActualPrice', () =>
{
  it('should construct', () =>
  {
    expect(construct({})).toBeTruthy()
  })
})
