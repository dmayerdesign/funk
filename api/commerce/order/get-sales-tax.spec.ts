import { construct } from "@funk/api/commerce/order/get-sales-tax"
import { Address } from "@funk/model/address/address"
import { Enterprise } from "@funk/model/commerce/enterprise/enterprise"
import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import { CurrencyCode } from "@funk/model/money/currency-code"
import { ORGANIZATIONS } from "@funk/model/organization/organization"

// TODO: Tighten up this test using jest-when.
describe("orderGetTax", function ()
{
  it("should populate the order and get sales tax", async function ()
  {
    const ORDER: Partial<Order> = {
      customer: {
        shippingAddress: {
          zip: "zip code",
        } as Address,
      },
      skus: [
        { id: "sku 1", productId: "product 1" },
        { id: "sku 2", productId: "product 2" },
      ] as MarshalledSku[],
    }
    const {
      marshalledOrder,
      getTotalBeforeTaxAndShipping,
      populate,
      getSalesTaxRateForAddress,
      getById,
    } = setUp(ORDER, 10000, 0.06)
    const getTaxUnderTest = construct(
      getTotalBeforeTaxAndShipping,
      populate,
      getSalesTaxRateForAddress,
      getById
    )

    const getTaxResult = await getTaxUnderTest(marshalledOrder)

    expect(getById).toHaveBeenCalledWith(ORGANIZATIONS, "primary")
    expect(getTaxResult).toEqual({ currency: CurrencyCode.USD, amount: 600 })
    expect(populate).toHaveBeenCalledWith(marshalledOrder, expect.anything())
  })

  it("should throw if no zip code is provided", async function ()
  {
    let error!: Error | undefined

    const ORDER = {} as Order
    const {
      marshalledOrder,
      getTotalBeforeTaxAndShipping,
      populate,
      getSalesTaxRateForAddress,
    } = setUp(ORDER, 10000, 0.06)
    const getTaxUnderTest = construct(
      getTotalBeforeTaxAndShipping,
      populate,
      getSalesTaxRateForAddress
    )

    try
    {
      await getTaxUnderTest(marshalledOrder)
    }
    catch(_error)
    {
      error = _error
    }

    expect(error?.constructor).toBe(InvalidInputError)
  })
})

const setUp = (
  order: Partial<Order>,
  orderTotalCents: number,
  taxRate: number
) =>
{
  const ENTERPRISE = { salesTaxNexusStates: [ "FL" ] } as Enterprise
  const populatedOrder = { ...order }
  const marshalledOrder = { ...order } as unknown as MarshalledOrder
  const getTotalBeforeTaxAndShipping = jest.fn().mockResolvedValue(
    { currency: CurrencyCode.USD, amount: orderTotalCents })
  const populate = jest.fn().mockReturnValue({ ...order })
  const getSalesTaxRateForAddress = jest.fn().mockReturnValue(taxRate)
  const getById = jest.fn().mockReturnValue(ENTERPRISE)

  return {
    populatedOrder,
    marshalledOrder,
    getTotalBeforeTaxAndShipping,
    populate,
    getSalesTaxRateForAddress,
    getById,
  }
}
