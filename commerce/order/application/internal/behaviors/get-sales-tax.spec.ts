import { Enterprise } from "@funk/commerce/enterprise/model/enterprise"
import { construct } from "@funk/commerce/order/application/internal/behaviors/get-sales-tax"
import { Order } from "@funk/commerce/order/model/order"
import { Sku } from "@funk/commerce/sku/model/sku"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import { CurrencyCode } from "@funk/money/model/currency-code"
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
        ] as Sku[],
      }
      const {
        marshalledOrder,
        getTotalBeforeTaxAndShipping,
        getSalesTaxRateForAddress,
        getPrimaryOrganization,
      } = setUp(ORDER, 10000, 0.06)
      const getTaxUnderTest = construct(
        getTotalBeforeTaxAndShipping,
        getSalesTaxRateForAddress,
        getPrimaryOrganization,
      )

      const getTaxResult = await getTaxUnderTest(marshalledOrder)

      expect(getPrimaryOrganization).toHaveBeenCalled()
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
        ] as Sku[],
      }
      const {
        marshalledOrder,
        getTotalBeforeTaxAndShipping,
        getSalesTaxRateForAddress,
        getPrimaryOrganization,
      } = setUp(ORDER, 10000, 0.06)
      const getTaxUnderTest = construct(
        getTotalBeforeTaxAndShipping,
        getSalesTaxRateForAddress,
        getPrimaryOrganization,
      )

      const getTaxResult = await getTaxUnderTest(marshalledOrder)

      expect(getPrimaryOrganization).toHaveBeenCalled()
      expect(getTaxResult).toEqual({ currency: CurrencyCode.USD, amount: 600 })
    })
  })

  describe("should fail to get sales tax", () => {
    it("if no zip code is provided", async () => {
      let error!: Error | undefined

      const ORDER = {} as Order
      const {
        marshalledOrder,
        getTotalBeforeTaxAndShipping,
        getSalesTaxRateForAddress,
        getPrimaryOrganization,
      } = setUp(ORDER, 10000, 0.06)
      const getTaxUnderTest = construct(
        getTotalBeforeTaxAndShipping,
        getSalesTaxRateForAddress,
        getPrimaryOrganization,
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
  const marshalledOrder = { ...order } as Order
  const getTotalBeforeTaxAndShipping = jest
    .fn()
    .mockResolvedValue({ currency: CurrencyCode.USD, amount: orderTotalCents })
  const getSalesTaxRateForAddress = jest.fn().mockReturnValue(taxRate)
  const getPrimaryOrganization = jest.fn().mockReturnValue(ENTERPRISE)

  return {
    populatedOrder,
    marshalledOrder,
    getTotalBeforeTaxAndShipping,
    getSalesTaxRateForAddress,
    getPrimaryOrganization,
  }
}
