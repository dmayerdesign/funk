import createOrderForCustomer from
  "@funk/model/commerce/order/actions/create-order-for-customer"
import setPopulatedSkuQuantity from "@funk/model/commerce/order/actions/set-populated-sku-quantity"
import { PopulatedOrder } from "@funk/model/commerce/order/order"
import { Sku } from "@funk/model/commerce/sku/sku"

describe("setPopulatedSkuQuantity", () =>
{
  it("should remove a SKU from a populated order", () =>
  {
    const orderWith1 = {
      ...createOrderForCustomer({}),
      skus: [ createSku("only sku") ],
      skuQuantityMap: { ["only sku"]: 1 },
    } as PopulatedOrder
    const orderWith3 = {
      ...createOrderForCustomer({}),
      skus: [ createSku("sku 1"), createSku("sku 2"), createSku("sku 3") ],
      skuQuantityMap: { ["sku 1"]: 1, ["sku 2"]: 1, ["sku 3"]: 1 },
    } as PopulatedOrder

    const orderWith0 = setPopulatedSkuQuantity(
      orderWith1,
      { sku: createSku("only sku"), quantity: 0 })
    const orderWith2 = setPopulatedSkuQuantity(
      orderWith3,
      { sku: createSku("sku 2"), quantity: 0 })

    expect(orderWith0.skus).toEqual([])
    expect(orderWith2.skus).toEqual([ createSku("sku 1"), createSku("sku 3") ])
  })

  it("should add {n} SKUs to a populated order", () =>
  {
    const quantityToAdd = Math.ceil(Math.random() * 5)
    const originalOrder = {
      ...createOrderForCustomer({}),
      skus: [ createSku("first sku") ],
      skuQuantityMap: { ["first sku"]: 1 },
    } as PopulatedOrder

    const orderWithNewSku = setPopulatedSkuQuantity(
      originalOrder,
      { sku: createSku("new sku"), quantity: quantityToAdd })

    expect(orderWithNewSku.skus).toEqual(
      [ createSku("first sku"), createSku("new sku") ])
    expect(orderWithNewSku.skuQuantityMap["new sku"]).toBe(quantityToAdd)
  })
})

const createSku = (id: string) => ({ id } as Sku)
