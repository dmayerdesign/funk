import { construct } from "@funk/api/core/commerce/order/set-sku-quantity"
import { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import { construct as constructSetById } from "@funk/api/plugins/persistence/behaviors/set-by-id"
import { ORDERS } from "@funk/model/commerce/order/order"

describe("orderSetSkuQuantity", () => {
  const ORDER_ID = "order id"
  const SKU_ID = "sku-id"
  const ORDER = { id: ORDER_ID, skus: [], discounts: [] }
  let getById: GetById
  let setById: ReturnType<typeof constructSetById>
  let setSkuQuantity: ReturnType<typeof construct>

  beforeEach(() => {
    getById = jest.fn().mockReturnValue(Promise.resolve(ORDER))
    setById = jest.fn()
    setSkuQuantity = construct(getById, setById)
  })

  it("should persist a change to SKU quantity", async function () {
    await setSkuQuantity({ orderId: ORDER_ID, skuId: SKU_ID, quantity: 1 })

    expect(getById).toHaveBeenCalledWith(ORDERS, ORDER_ID)
    expect(setById).toHaveBeenCalledWith(ORDERS, ORDER_ID, expect.any(Object))
  })
})
