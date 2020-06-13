import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { construct } from "@funk/api/commerce/order/get-tax"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import { Address } from "@funk/model/address/address"
import { CurrencyCode } from "@funk/model/commerce/price/currency-code"
import { MarshalledSku } from "@funk/model/commerce/sku/sku"

describe("orderGetTax", () =>
{
  it("should populate the order and pass it to the `getTax` method", async (done) =>
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
      getTaxRateForPostalCode,
    } = setUp(ORDER, 10000, 0.06)
    const getTaxUnderTest = construct(
      getTotalBeforeTaxAndShipping,
      populate,
      getTaxRateForPostalCode
    )

    const getTaxResult = await getTaxUnderTest(marshalledOrder)

    expect(getTaxResult).toEqual({ currency: CurrencyCode.USD, amount: 600 })
    expect(populate).toHaveBeenCalledWith(marshalledOrder, expect.anything())
    done()
  })

  it("should throw if no zip code is provided", async (done) =>
  {
    let error!: Error | undefined

    const ORDER = {} as Order
    const {
      marshalledOrder,
      getTotalBeforeTaxAndShipping,
      populate,
      getTaxRateForPostalCode,
    } = setUp(ORDER, 10000, 0.06)
    const getTaxUnderTest = construct(
      getTotalBeforeTaxAndShipping,
      populate,
      getTaxRateForPostalCode
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
    done()
  })
})

const setUp = (
  order: Partial<Order>,
  orderTotalCents: number,
  taxRate: number
) =>
{
  const populatedOrder = { ...order }
  const marshalledOrder = { ...order } as unknown as MarshalledOrder
  const getTotalBeforeTaxAndShipping = jest.fn().mockResolvedValue(
    { currency: CurrencyCode.USD, amount: orderTotalCents })
  const populate = jest.fn().mockReturnValue({ ...order })
  const getTaxRateForPostalCode = jest.fn().mockReturnValue(taxRate)

  return {
    populatedOrder,
    marshalledOrder,
    getTotalBeforeTaxAndShipping,
    populate,
    getTaxRateForPostalCode,
  }
}
