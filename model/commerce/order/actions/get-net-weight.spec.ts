import getNetWeight from "@funk/model/commerce/order/actions/get-net-weight"
import { Order } from "@funk/model/commerce/order/order"
import { Sku } from "@funk/model/commerce/sku/sku"
import { WeightUnit } from "@funk/model/units/weight-unit"

describe("getNetWeight", () =>
{
  it("should get the combined net weight of all Skus in the order", () =>
  {
    const ORDER = {
      skus: [
        { netWeight: { amount: 10, unit: WeightUnit.OUNCES } },
        { netWeight: { amount: 10, unit: WeightUnit.OUNCES } },
      ] as Sku[],
    } as Order

    expect(getNetWeight(ORDER)).toEqual({
      amount: 20,
      unit: WeightUnit.OUNCES,
    })
  })
})
