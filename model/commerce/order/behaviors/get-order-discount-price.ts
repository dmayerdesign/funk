/* eslint-disable @typescript-eslint/indent */
import getApplicableDiscountsForOrder from "@funk/model/commerce/discount/behaviors/get-applicable-discounts-for-order"
import getOrderDiscounts from "@funk/model/commerce/discount/behaviors/get-order-discounts"
import { Order } from "@funk/model/commerce/order/order"
import subtract from "@funk/model/commerce/price/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import add from "@funk/model/money/behaviors/add"

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
