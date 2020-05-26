import { construct } from "@funk/model/commerce/sku/actions/get-price-after-discounts"

xdescribe("getActualPrice", () =>
{
  it("should construct", () =>
  {
    expect(construct({})).toBeTruthy()
  })
})
