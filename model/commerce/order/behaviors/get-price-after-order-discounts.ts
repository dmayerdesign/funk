/* eslint-disable @typescript-eslint/indent */
import { OrderDiscount } from "@funk/model/commerce/discount/discount"
import getOrderDiscounts from "@funk/model/commerce/order/behaviors/get-order-discounts"
import { Order } from "@funk/model/commerce/order/order"
import subtract from "@funk/model/commerce/price/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { DbDocumentInput } from "@funk/model/data-access/database-document"

export default function(
  order: DbDocumentInput<Order>,
  orderPrice: Price
): Price
{
  const totalDiscountForSkus = getOrderDiscounts(order).reduce<Price>(
    (discountAmount, discount) =>
    {
      if (orderPriceDoesNotFallWithinDiscountLimits(discount, orderPrice))
      {
        return discountAmount
      }
      else if (!!discount.percentage)
      {
        return {
          ...discountAmount,
          amount: orderPrice.amount * discount.percentage,
        }
      }
      else if (!!discount.total)
      {
        return discount.total
      }
      return discountAmount
    },
    { ...NULL_PRICE, currency: orderPrice.currency })
  return subtract(orderPrice, totalDiscountForSkus)
}

function orderPriceDoesNotFallWithinDiscountLimits(
  discount: OrderDiscount,
  orderPrice: Price
): boolean
{
  return orderPriceIsBelowDiscountLowerLimit(discount, orderPrice)
    || orderPriceIsGteDiscountUpperLimit(discount, orderPrice)
}

function orderPriceIsBelowDiscountLowerLimit(discount: OrderDiscount, price: Price): boolean
{
  return !!discount.orderTotalLowerLimit
    && subtract(price, discount.orderTotalLowerLimit).amount < 0
}

function orderPriceIsGteDiscountUpperLimit(discount: OrderDiscount, price: Price): boolean
{
  return !!discount.orderTotalUpperLimit
    && subtract(price, discount.orderTotalUpperLimit).amount >= 0
}
