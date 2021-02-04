import getShipmentPostalCode from "@funk/commerce/order/model/behaviors/get-shipment-postal-code"
import { Order } from "@funk/commerce/order/model/order"

describe("getShipmentPostalCode", () => {
  it("should get the postal code from the order's shipping address", () => {
    const ORDER = { customer: { shippingAddress: { zip: "00000" } } } as Order
    expect(getShipmentPostalCode(ORDER)).toBe("00000")
  })
})
