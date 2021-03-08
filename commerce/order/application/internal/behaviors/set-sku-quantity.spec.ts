import { GetById } from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import { UpdateById } from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import {
  construct,
  SetSkuQuantity,
} from "@funk/commerce/order/application/internal/behaviors/set-sku-quantity"
import { GetById as GetSkuById } from "@funk/commerce/sku/application/internal/behaviors/persistence/get-by-id"
import { createFakeSku } from "@funk/commerce/sku/model/stubs"

describe("orderSetSkuQuantity", () => {
  const ORDER_ID = "order id"
  const SKU_ID = "sku-id"
  const ORDER = { id: ORDER_ID, skus: [], discounts: [] }
  const SKU = createFakeSku()
  let getById: GetById
  let getSkuById: GetSkuById
  let updateById: UpdateById
  let setSkuQuantity: SetSkuQuantity

  beforeEach(() => {
    getById = jest.fn().mockReturnValue(Promise.resolve(ORDER))
    getSkuById = jest.fn().mockReturnValue(Promise.resolve(SKU))
    updateById = jest.fn()
    setSkuQuantity = construct(getById, updateById, getSkuById)
  })

  it("should persist a change to SKU quantity", async () => {
    await setSkuQuantity({ orderId: ORDER_ID, skuId: SKU_ID, quantity: 1 })

    expect(getById).toHaveBeenCalledWith(ORDER_ID)
    expect(updateById).toHaveBeenCalledWith(ORDER_ID, expect.any(Object))
  })

  it("should throw if the order is absent", async () => {
    getById = jest.fn().mockReturnValue(Promise.resolve(undefined))
    setSkuQuantity = construct(getById, updateById, getSkuById)
    await expect(
      setSkuQuantity({ orderId: ORDER_ID, skuId: ORDER_ID, quantity: 1 }),
    ).rejects.toThrow()
  })

  it("should throw if the sku is absent", async () => {
    getSkuById = jest.fn().mockReturnValue(Promise.resolve(undefined))
    setSkuQuantity = construct(getById, updateById, getSkuById)
    await expect(
      setSkuQuantity({ orderId: ORDER_ID, skuId: SKU_ID, quantity: 1 }),
    ).rejects.toThrow()
  })
})
