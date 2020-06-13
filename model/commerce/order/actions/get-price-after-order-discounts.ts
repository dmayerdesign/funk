/* eslint-disable @typescript-eslint/indent */
import { OrderDiscount } from "@funk/model/commerce/discount/discount"
import { Order } from "@funk/model/commerce/order/order"
import subtract from "@funk/model/commerce/price/actions/subtract"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import getOrderDiscounts from "@funk/model/commerce/order/actions/get-order-discounts"

export default function(
  order: DbDocumentInput<Order>,
  orderPrice: Price
): Price
{
  const totalDiscount = getOrderDiscounts(order).reduce<Price>(
    (discountAmount, discount) =>
    {
      if (orderPriceDoesNotFallWithinDiscountLimits(discount, orderPrice))
      {
        return discountAmount
      }
      else if (!!discount.percentage)
      {
        return {
          amount: orderPrice.amount * discount.percentage,
          ...discountAmount,
        }
      }
      else if (!!discount.total)
      {
        return discount.total
      }
      return discountAmount
    },
    { ...NULL_PRICE, currency: orderPrice.currency })
  return subtract(orderPrice, totalDiscount)
}

function orderPriceDoesNotFallWithinDiscountLimits(
  discount: OrderDiscount,
  orderPrice: Price
): boolean
{
  return orderPriceIsBelowDiscountLowerLimit(discount, orderPrice)
    || orderPriceIsGteDiscountUpperLimit(discount, orderPrice)
}

function orderPriceIsGteDiscountUpperLimit(discount: OrderDiscount, price: Price): boolean
{
  return !!discount.orderTotalUpperLimit
    && subtract(price, discount.orderTotalUpperLimit).amount >= 0
}

function orderPriceIsBelowDiscountLowerLimit(discount: OrderDiscount, price: Price): boolean
{
  return !!discount.orderTotalLowerLimit
    && subtract(price, discount.orderTotalLowerLimit).amount < 0
}
