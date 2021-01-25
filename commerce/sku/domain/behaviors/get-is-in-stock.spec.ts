import getIsInStock from "@funk/commerce/sku/domain/behaviors/get-is-in-stock"
import { Inventory } from "@funk/commerce/sku/domain/inventory"
import { createFakeMarshalledSku } from "@funk/commerce/sku/domain/stubs"

describe("getIsInStock", () => {
  it("is in stock", () => {
    const inStockSkus = [
      createFakeMarshalledSku("test 1", {
        inventory: { type: "finite", quantity: 1, quantityReserved: 0 },
      }),
      createFakeMarshalledSku("test 2", {
        inventory: { type: "finite", quantity: 6, quantityReserved: 5 },
      }),
      createFakeMarshalledSku("test 3", {
        inventory: { type: "bucket", bucket: "in_stock" },
      }),
      createFakeMarshalledSku("test 4", {
        inventory: { type: "bucket", bucket: "limited" },
      }),
    ]

    const allAreInStock = inStockSkus.every((sku) => getIsInStock(sku))

    expect(allAreInStock).toBe(true)
  })

  it("is out of stock", () => {
    const outOfStockSkus = [
      createFakeMarshalledSku("test 1", {
        inventory: { type: "finite", quantity: 0 } as Inventory,
      }),
      createFakeMarshalledSku("test 2", {
        inventory: {
          type: "finite",
          quantity: 5,
          quantityReserved: 5,
        } as Inventory,
      }),
      createFakeMarshalledSku("test 3", {
        inventory: { type: "bucket", bucket: "out_of_stock" } as Inventory,
      }),
    ]

    const allAreOutOfStock = outOfStockSkus.every((sku) => !getIsInStock(sku))

    expect(allAreOutOfStock).toBe(true)
  })
})
