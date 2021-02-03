import createOrderForCustomer from "@funk/commerce/order/domain/behaviors/create-order-for-customer"
import setSkuQuantity from "@funk/commerce/order/domain/behaviors/set-sku-quantity"
import { Order } from "@funk/commerce/order/domain/order"
import { createFakeMarshalledSku } from "@funk/commerce/sku/domain/stubs"

describe("setSkuQuantity", () => {
  it("should remove a SKU from a populated order", () => {
    const orderWith1 = {
      ...createOrderForCustomer({}),
      skus: [createFakeMarshalledSku("only sku")],
      skuQuantityMap: { ["only sku"]: 1 },
    } as Order
    const orderWith3 = {
      ...createOrderForCustomer({}),
      skus: [
        createFakeMarshalledSku("sku 1"),
        createFakeMarshalledSku("sku 2"),
        createFakeMarshalledSku("sku 3"),
      ],
      skuQuantityMap: { ["sku 1"]: 1, ["sku 2"]: 1, ["sku 3"]: 1 },
    } as Order

    const orderWith0 = setSkuQuantity(orderWith1, {
      sku: createFakeMarshalledSku("only sku"),
      quantity: 0,
    })
    const orderWith2 = setSkuQuantity(orderWith3, {
      sku: createFakeMarshalledSku("sku 2"),
      quantity: 0,
    })

    expect(orderWith0.skus).toEqual([])
    expect(orderWith2.skus).toEqual([
      createFakeMarshalledSku("sku 1"),
      createFakeMarshalledSku("sku 3"),
    ])
  })

  it("should add {n} SKUs to a populated order", () => {
    const quantityToAdd = Math.ceil(Math.random() * 5)
    const originalOrder = {
      ...createOrderForCustomer({}),
      skus: [createFakeMarshalledSku("first sku")],
      skuQuantityMap: { ["first sku"]: 1 },
    } as Order

    const orderWithNewSku = setSkuQuantity(originalOrder, {
      sku: createFakeMarshalledSku("new sku"),
      quantity: quantityToAdd,
    })

    expect(orderWithNewSku.skus).toEqual([
      createFakeMarshalledSku("first sku"),
      createFakeMarshalledSku("new sku"),
    ])
    expect(orderWithNewSku.skuQuantityMap["new sku"]).toBe(quantityToAdd)
  })
})
