import createOrderForCustomer from "@funk/commerce/order/model/behaviors/create-order-for-customer"
import setMarshalledSkuQuantity from "@funk/commerce/order/model/behaviors/set-marshalled-sku-quantity"
import { MarshalledOrder } from "@funk/commerce/order/model/order"

describe("setMarshalledSkuQuantity", () => {
  it("should remove a SKU from a marshalled order", () => {
    const orderWith1 = {
      ...createOrderForCustomer({}),
      skus: ["only sku"],
      skuQuantityMap: { ["only sku"]: 1 },
    } as MarshalledOrder
    const orderWith3 = {
      ...createOrderForCustomer({}),
      skus: ["sku 1", "sku 2", "sku 3"],
      skuQuantityMap: { ["sku 1"]: 1, ["sku 2"]: 1, ["sku 3"]: 1 },
    } as MarshalledOrder

    const orderWith0 = setMarshalledSkuQuantity(orderWith1, {
      skuId: "only sku",
      quantity: 0,
    })
    const orderWith2 = setMarshalledSkuQuantity(orderWith3, {
      skuId: "sku 2",
      quantity: 0,
    })

    expect(orderWith0.skus).toEqual([])
    expect(orderWith2.skus).toEqual(["sku 1", "sku 3"])
  })

  it("should add {n} SKUs to a marshalled order", () => {
    const quantityToAdd = Math.ceil(Math.random() * 5)
    const originalOrder = {
      ...createOrderForCustomer({}),
      skus: ["first sku"],
      skuQuantityMap: { ["first sku"]: 1 },
    } as MarshalledOrder

    const orderWithNewSku = setMarshalledSkuQuantity(originalOrder, {
      skuId: "new sku",
      quantity: quantityToAdd,
    })

    expect(orderWithNewSku.skus).toEqual(["first sku", "new sku"])
    expect(orderWithNewSku.skuQuantityMap["new sku"]).toBe(quantityToAdd)
  })
})
