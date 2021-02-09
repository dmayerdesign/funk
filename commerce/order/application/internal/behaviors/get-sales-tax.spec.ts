import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import { construct } from "@funk/commerce/order/application/internal/behaviors/get-sales-tax"
import { MarshalledOrder, Order } from "@funk/commerce/order/model/order"
import { MarshalledSku } from "@funk/commerce/sku/model/sku"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import { Address } from "@funk/places/model/address"

// TODO: Tighten up this test using jest-when.
describe("orderGetSalesTax", () => {
  describe("should populate the order and get sales tax", () => {
    it("should be ZERO if the primary Enterprise DOES NOT have nexus in the customer's location", async () => {
      const ORDER: Partial<Order> = {
        customer: {
          shippingAddress: {
            zip: "zip code",
            state: "NOT_FL",
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
        getById,
      )

      const getTaxResult = await getTaxUnderTest(marshalledOrder)

      expect(getById).toHaveBeenCalledWith(ORGANIZATIONS, "primary")
      expect(populate).toHaveBeenCalledWith(marshalledOrder, expect.anything())
      expect(getTaxResult).toEqual({ currency: CurrencyCode.USD, amount: 0 })
    })

    it("should be nonzero if the primary Enterprise has nexus in the customer's location", async () => {
      const ORDER: Partial<Order> = {
        customer: {
          shippingAddress: {
            zip: "zip code",
            state: "FL",
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
        getById,
      )

      const getTaxResult = await getTaxUnderTest(marshalledOrder)

      expect(getById).toHaveBeenCalledWith(ORGANIZATIONS, "primary")
      expect(getTaxResult).toEqual({ currency: CurrencyCode.USD, amount: 600 })
      expect(populate).toHaveBeenCalledWith(marshalledOrder, expect.anything())
    })
  })

  describe("should fail to get sales tax", () => {
    it("if no zip code is provided", async () => {
      let error!: Error | undefined

      const ORDER = {} as Order
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
        getById,
      )

      try {
        await getTaxUnderTest(marshalledOrder)
      } catch (_error) {
        error = _error
      }

      expect(error?.constructor).toBe(InvalidInputError)
    })
  })
})

const setUp = (
  order: Partial<Order>,
  orderTotalCents: number,
  taxRate: number,
) => {
  const ENTERPRISE = { salesTaxNexusStates: ["FL"] } as Enterprise
  const populatedOrder = { ...order }
  const marshalledOrder = ({ ...order } as unknown) as MarshalledOrder
  const getTotalBeforeTaxAndShipping = jest
    .fn()
    .mockResolvedValue({ currency: CurrencyCode.USD, amount: orderTotalCents })
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
