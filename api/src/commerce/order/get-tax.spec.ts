import { MarshalledOrder } from "@funk/model/commerce/order/order"
import { construct } from "@funk/api/commerce/order/get-tax"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

describe("orderGetTax", () =>
{
  it("should populate the order and pass it to the `getTax` method", async (done) =>
  {
    const ORDER = {
      customer: {
        billingAddress: {
          zip: "zip code",
        },
      },
    } as unknown as MarshalledOrder
    const {
      populate,
      getProductForSku,
      constructGetTax,
      populatedOrder,
      getTax,
    } = setUp(ORDER)
    const getTaxUnderTest = construct({ populate, getProductForSku, constructGetTax })

    const getTaxResult = await getTaxUnderTest(ORDER)

    expect(getTaxResult).toEqual("getTax return value")
    expect(populate).toHaveBeenCalledWith(ORDER, expect.anything())
    expect(constructGetTax).toHaveBeenCalledWith({ getProductForSku })
    expect(getTax).toHaveBeenCalledWith(populatedOrder)
    done()
  })

  it("should throw if no zip code is provided", async (done) =>
  {
    let error!: Error | undefined

    const ORDER = {} as unknown as MarshalledOrder
    const {
      populate,
      getProductForSku,
      constructGetTax,
    } = setUp(ORDER)
    const getTaxUnderTest = construct({ populate, getProductForSku, constructGetTax })

    try
    {
      await getTaxUnderTest(ORDER)
    }
    catch(_error)
    {
      error = _error
    }

    expect(error?.constructor).toBe(InvalidInputError)
    done()
  })
})

const setUp = (order: any) =>
{
  const populatedOrder = { ...order }
  const populate = jasmine.createSpy().and.returnValue(populatedOrder)
  const getProductForSku = jasmine.createSpy()
  const getTax = jasmine.createSpy().and.returnValue("getTax return value")
  const constructGetTax = jasmine.createSpy().and.returnValue(getTax)
  return { populate, getProductForSku, getTax, constructGetTax, populatedOrder }
}
