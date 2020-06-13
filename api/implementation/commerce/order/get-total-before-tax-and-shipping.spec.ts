import { construct as constructGetTotalBeforeTaxAndShipping } from
  "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import { Order } from "@funk/model/commerce/order/order"
import { CurrencyCode } from "@funk/model/commerce/price/currency-code"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { Discount } from "@funk/model/commerce/discount/discount"

describe("getTotalBeforeTaxAndShipping", () =>
{
  it("should get the before-tax total for an order", async (done) =>
  {
    const SKU1 = {
      id: "sku-1",
      price: { amount: 1000, currency: CurrencyCode.USD },
    } as MarshalledSku
    const SKU2 = {
      id: "sku-2",
      price: { amount: 1000, currency: CurrencyCode.USD },
    } as MarshalledSku
    const DISCOUNTS = [
      { type: "order", total: { amount: 500, currency: CurrencyCode.USD } },
    ] as Discount[]
    const ORDER = { skus: [ SKU1, SKU2 ], discounts: DISCOUNTS } as Order
    const getById = jest.fn()
    const getTotalBeforeTaxAndShipping = constructGetTotalBeforeTaxAndShipping(getById)

    const totalBeforeTax = await getTotalBeforeTaxAndShipping(ORDER)

    expect(totalBeforeTax).toEqual({ amount: 1500, currency: CurrencyCode.USD })
    done()
  })
})
