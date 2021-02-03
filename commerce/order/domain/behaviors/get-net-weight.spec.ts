import getNetWeight from "@funk/commerce/order/domain/behaviors/get-net-weight"
import { Order } from "@funk/commerce/order/domain/order"
import { Sku } from "@funk/commerce/sku/domain/sku"
import { WeightUnit } from "@funk/units/domain/weight-unit"

describe("getNetWeight", () => {
  it("should get the combined net weight of all Skus in the order", () => {
    const ORDER = ({
      skus: [
        { netWeight: { amount: 10, unit: WeightUnit.OUNCES } },
        { netWeight: { amount: 10, unit: WeightUnit.OUNCES } },
      ] as Sku[],
    } as unknown) as Order

    expect(getNetWeight(ORDER)).toEqual({
      amount: 20,
      unit: WeightUnit.OUNCES,
    })
  })
})
