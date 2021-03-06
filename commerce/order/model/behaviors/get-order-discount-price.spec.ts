import { createFakeOrderDiscount } from "@funk/commerce/discount/model/stubs"
import getOrderDiscountPrice from "@funk/commerce/order/model/behaviors/get-order-discount-price"
import { createFakeOrder } from "@funk/commerce/order/model/stubs"
import { NULL_PRICE } from "@funk/commerce/price/model/price"

describe("getOrderDiscountPrice", () => {
  it("should apply `total` discounts", async () => {
    const order = createFakeOrder("test order 1", {
      discounts: [
        {
          ...createFakeOrderDiscount("test discount 1"),
          isCompoundable: true,
          total: { ...NULL_PRICE, amount: 1000 },
        },
        {
          ...createFakeOrderDiscount("test discount 2"),
          isCompoundable: true,
          total: { ...NULL_PRICE, amount: 1000 },
        },
      ],
    })

    const priceAfter = getOrderDiscountPrice(order, {
      ...NULL_PRICE,
      amount: 4000,
    })

    expect(priceAfter.amount).toBe(2000)
  })

  it("should apply `percentage` discounts", async () => {
    const order = createFakeOrder("test order 1", {
      discounts: [
        {
          ...createFakeOrderDiscount("test discount 1"),
          isCompoundable: true,
          percentage: 50,
        },
        {
          ...createFakeOrderDiscount("test discount 2"),
          isCompoundable: true,
          percentage: 10,
        },
      ],
    })

    const priceAfter = getOrderDiscountPrice(order, {
      ...NULL_PRICE,
      amount: 10000,
    })

    expect(priceAfter.amount).toBe(4500)
  })
})
