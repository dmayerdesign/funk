/* eslint-disable @typescript-eslint/indent */
import getApplicableDiscountsForOrder from "@funk/commerce/discount/domain/behaviors/get-applicable-discounts-for-order"
import getOrderDiscounts from "@funk/commerce/discount/domain/behaviors/get-order-discounts"
import { Order } from "@funk/commerce/order/domain/order"
import subtract from "@funk/commerce/price/domain/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/commerce/price/domain/price"
import add from "@funk/money/domain/behaviors/add"

export default function (
  order: Pick<Order, "discounts">,
  unDiscountedOrderPrice: Price,
): Price {
  const zeroPrice = {
    ...NULL_PRICE,
    currency: unDiscountedOrderPrice.currency,
  }
  const discountTotal = getApplicableDiscountsForOrder(
    getOrderDiscounts(order.discounts),
    unDiscountedOrderPrice,
  ).reduce<Price>((discountAmount, discount) => {
    if (!!discount.percentage) {
      return add(discountAmount, {
        ...discountAmount,
        amount: Math.floor(
          subtract(unDiscountedOrderPrice, discountAmount).amount *
            (discount.percentage / 100),
        ),
      })
    } else if (!!discount.total) {
      return add(discountAmount, discount.total)
    }
    return discountAmount
  }, zeroPrice)
  return subtract(unDiscountedOrderPrice, discountTotal)
}
