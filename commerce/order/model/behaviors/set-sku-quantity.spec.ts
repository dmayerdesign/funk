import createOrderForCustomer from "@funk/commerce/order/model/behaviors/create-order-for-customer"
import setSkuQuantity from "@funk/commerce/order/model/behaviors/set-sku-quantity"
import { Order } from "@funk/commerce/order/model/order"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"

describe("setSkuQuantity", () => {
  it("should remove a SKU from a populated order", () => {
    const orderWith1 = {
      ...createOrderForCustomer({}),
      skus: [createFakeSku("only sku")],
      skuQuantityMap: { ["only sku"]: 1 },
    } as Order
    const orderWith3 = {
      ...createOrderForCustomer({}),
      skus: [
        createFakeSku("sku 1"),
        createFakeSku("sku 2"),
        createFakeSku("sku 3"),
      ],
      skuQuantityMap: { ["sku 1"]: 1, ["sku 2"]: 1, ["sku 3"]: 1 },
    } as Order

    const orderWith0 = setSkuQuantity(orderWith1, {
      sku: createFakeSku("only sku"),
      quantity: 0,
    })
    const orderWith2 = setSkuQuantity(orderWith3, {
      sku: createFakeSku("sku 2"),
      quantity: 0,
    })

    expect(orderWith0.skus).toEqual([])
    expect(orderWith2.skus).toEqual([
      createFakeSku("sku 1"),
      createFakeSku("sku 3"),
    ])
  })

  it("should add {n} SKUs to a populated order", () => {
    const quantityToAdd = Math.ceil(Math.random() * 5)
    const originalOrder = {
      ...createOrderForCustomer({}),
      skus: [createFakeSku("first sku")],
      skuQuantityMap: { ["first sku"]: 1 },
    } as Order

    const orderWithNewSku = setSkuQuantity(originalOrder, {
      sku: createFakeSku("new sku"),
      quantity: quantityToAdd,
    })

    expect(orderWithNewSku.skus).toEqual([
      createFakeSku("first sku"),
      createFakeSku("new sku"),
    ])
    expect(orderWithNewSku.skuQuantityMap["new sku"]).toBe(quantityToAdd)
  })
})
