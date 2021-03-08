import { Discount } from "@funk/commerce/discount/model/discount"
import { construct as constructGetTotalBeforeTaxAndShipping } from "@funk/commerce/order/application/internal/behaviors/get-total-before-tax-and-shipping"
import { Order } from "@funk/commerce/order/model/order"
import { createFakeProduct } from "@funk/commerce/product/model/stubs"
import { Sku } from "@funk/commerce/sku/model/sku"
import { CurrencyCode } from "@funk/money/model/currency-code"

describe("getTotalBeforeTaxAndShipping", () => {
  it("should get the before-tax total for an order", async () => {
    const SKU1 = {
      id: "sku-1",
      price: { amount: 1000, currency: CurrencyCode.USD },
    } as Sku
    const SKU2 = {
      id: "sku-2",
      price: { amount: 1000, currency: CurrencyCode.USD },
    } as Sku
    const DISCOUNTS = [
      { type: "order", total: { amount: 500, currency: CurrencyCode.USD } },
    ] as Discount[]
    const ORDER = { skus: [SKU1, SKU2], discounts: DISCOUNTS } as Order
    const FAKE_PRODUCT = createFakeProduct()
    const getProductById = jest.fn().mockResolvedValue(FAKE_PRODUCT)
    const getTotalBeforeTaxAndShipping = constructGetTotalBeforeTaxAndShipping(
      getProductById,
    )

    const totalBeforeTax = await getTotalBeforeTaxAndShipping(ORDER)

    expect(totalBeforeTax).toEqual({ amount: 1500, currency: CurrencyCode.USD })
  })
})
