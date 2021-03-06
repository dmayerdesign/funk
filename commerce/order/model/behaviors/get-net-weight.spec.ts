import getNetWeight from "@funk/commerce/order/model/behaviors/get-net-weight"
import { Order } from "@funk/commerce/order/model/order"
import { Sku } from "@funk/commerce/sku/model/sku"
import { WeightUnit } from "@funk/things/model/weight/weight-unit"

describe("getNetWeight", () => {
  it("should get the combined net weight of all Skus in the order", () => {
    const ORDER = ({
      skus: [
        { netWeight: { amount: 10, unit: WeightUnit.OUNCES } },
        { netWeight: { amount: 10, unit: WeightUnit.OUNCES } },
      ] as Sku[],
    } as Partial<Order>) as Order

    expect(getNetWeight(ORDER)).toEqual({
      amount: 20,
      unit: WeightUnit.OUNCES,
    })
  })
})
