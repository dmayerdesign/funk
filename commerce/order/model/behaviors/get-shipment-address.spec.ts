import getShipmentAddress from "@funk/commerce/order/model/behaviors/get-shipment-address"
import { Order } from "@funk/commerce/order/model/order"

describe("getShipmentAddress", () => {
  it("should get the postal code from the order's shipping address", () => {
    const ADDRESS = { zip: "00000" }
    const ORDER = { customer: { shippingAddress: ADDRESS } } as Order
    expect(getShipmentAddress(ORDER)).toEqual(ADDRESS)
  })
})
