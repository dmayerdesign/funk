import getApplicableDiscountsForOrder from "@funk/commerce/discount/model/behaviors/get-applicable-discounts-for-order"
import { OrderDiscount } from "@funk/commerce/discount/model/discount"
import { createFakeOrderDiscount } from "@funk/commerce/discount/model/stubs"
import { CurrencyCode } from "@funk/money/model/currency-code"

describe("getApplicableDiscountsForOrder", () => {
  it("should apply compoundable discounts", () => {
    const ORDER_PRICE = { amount: 1000, currency: CurrencyCode.USD }
    const ALL_DISCOUNTS: OrderDiscount[] = [
      {
        ...createFakeOrderDiscount("test amount discount 1"),
        isCompoundable: true,
        total: { amount: 1000, currency: CurrencyCode.USD },
      },
      {
        ...createFakeOrderDiscount("test amount discount 2"),
        isCompoundable: true,
        total: { amount: 1000, currency: CurrencyCode.USD },
      },
    ]

    expect(getApplicableDiscountsForOrder(ALL_DISCOUNTS, ORDER_PRICE)).toEqual(
      ALL_DISCOUNTS,
    )
  })

  it("should only allow one non-compoundable discount", () => {
    const ORDER_PRICE = { amount: 1000, currency: CurrencyCode.USD }
    const ALL_DISCOUNTS: OrderDiscount[] = [
      {
        ...createFakeOrderDiscount("test amount discount 1"),
        isCompoundable: false,
        total: { amount: 1000, currency: CurrencyCode.USD },
      },
      {
        ...createFakeOrderDiscount("test amount discount 2"),
        isCompoundable: false,
        total: { amount: 1000, currency: CurrencyCode.USD },
      },
    ]

    expect(getApplicableDiscountsForOrder(ALL_DISCOUNTS, ORDER_PRICE)).toEqual([
      ALL_DISCOUNTS[0],
    ])
  })

  it("should filter out discounts for which the order does not meet the minimum amount", () => {
    const ORDER_PRICE = { amount: 1000, currency: CurrencyCode.USD }
    const ALL_DISCOUNTS: OrderDiscount[] = [
      {
        ...createFakeOrderDiscount("test amount discount 1"),
        percentage: 10,
        orderTotalLowerLimit: {
          ...ORDER_PRICE,
          amount: ORDER_PRICE.amount + 1,
        },
      },
    ]

    expect(getApplicableDiscountsForOrder(ALL_DISCOUNTS, ORDER_PRICE)).toEqual(
      [],
    )
  })

  it("should filter out discounts for which the order exceeds the maximum amount", () => {
    const ORDER_PRICE = { amount: 10000, currency: CurrencyCode.USD }
    const ALL_DISCOUNTS: OrderDiscount[] = [
      {
        ...createFakeOrderDiscount("test amount discount 1"),
        percentage: 10,
        orderTotalUpperLimit: {
          ...ORDER_PRICE,
          amount: ORDER_PRICE.amount - 1,
        },
      },
    ]

    expect(getApplicableDiscountsForOrder(ALL_DISCOUNTS, ORDER_PRICE)).toEqual(
      [],
    )
  })
})
