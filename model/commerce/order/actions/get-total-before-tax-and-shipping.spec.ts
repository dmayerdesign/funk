import { construct as constructGetTotalBeforeTaxAndShipping } from
  "@funk/model/commerce/order/actions/get-total-before-tax-and-shipping"
import { PopulatedOrder } from "@funk/model/commerce/order/order"
import { CurrencyCode } from "@funk/model/commerce/price/currency-code"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/sku/sku"
import { Discount } from "../../discount/discount"

describe("getTotalBeforeTaxAndShipping", () =>
{
  it("should get the before-tax total for an order", async (done) =>
  {
    const PRODUCT1 = {} as MarshalledProduct
    const PRODUCT2 = {} as MarshalledProduct
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
    const ORDER = { skus: [ SKU1, SKU2 ], discounts: DISCOUNTS } as PopulatedOrder
    const getProductForSku = async (sku: Sku) =>
    {
      switch (sku)
      {
        case SKU1: return PRODUCT1
        default: return PRODUCT2
      }
    }

    const getTotalBeforeTaxAndShipping =
      constructGetTotalBeforeTaxAndShipping({ getProductForSku })
    const totalBeforeTax = await getTotalBeforeTaxAndShipping(ORDER)

    expect(totalBeforeTax).toEqual({ amount: 1500, currency: CurrencyCode.USD })
    done()
  })
})
