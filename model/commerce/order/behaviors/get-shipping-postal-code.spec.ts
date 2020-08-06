import getShippingPostalCode from
  "@funk/model/commerce/order/behaviors/get-shipping-postal-code"
import { Order } from "@funk/model/commerce/order/order"

describe("getShippingPostalCode", () =>
{
  it("should get the postal code from the order's shipping address", () =>
  {
    const ORDER = { customer: { shippingAddress: { zip: "00000" } } } as Order
    expect(getShippingPostalCode(ORDER)).toBe("00000")
  })
})
