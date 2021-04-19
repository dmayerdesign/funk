import getIsInStock from "@funk/commerce/sku/model/behaviors/get-is-in-stock"
import { Inventory } from "@funk/commerce/sku/model/inventory"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"

describe("getIsInStock", () => {
  it("is in stock", () => {
    const inStockSkus = [
      createFakeSku("test 1", {
        inventory: { type: "finite", quantity: 1, quantityReserved: 0 },
      }),
      createFakeSku("test 2", {
        inventory: { type: "finite", quantity: 6, quantityReserved: 5 },
      }),
      createFakeSku("test 3", {
        inventory: { type: "bucket", bucket: "in_stock" },
      }),
      createFakeSku("test 4", {
        inventory: { type: "bucket", bucket: "limited" },
      }),
    ]

    const allAreInStock = inStockSkus.every((sku) => getIsInStock(sku))

    expect(allAreInStock).toBe(true)
  })

  it("is out of stock", () => {
    const outOfStockSkus = [
      createFakeSku("test 1", {
        inventory: { type: "finite", quantity: 0 } as Inventory,
      }),
      createFakeSku("test 2", {
        inventory: {
          type: "finite",
          quantity: 5,
          quantityReserved: 5,
        } as Inventory,
      }),
      createFakeSku("test 3", {
        inventory: { type: "bucket", bucket: "out_of_stock" } as Inventory,
      }),
    ]

    const allAreOutOfStock = outOfStockSkus.every((sku) => !getIsInStock(sku))

    expect(allAreOutOfStock).toBe(true)
  })
})
