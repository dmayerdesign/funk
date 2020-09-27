/* eslint-disable @typescript-eslint/indent */
import getOrderDiscounts from "@funk/model/commerce/order/behaviors/get-order-discounts"
import { Order } from "@funk/model/commerce/order/order"
import subtract from "@funk/model/commerce/price/behaviors/subtract"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { DbDocumentInput } from "@funk/model/data-access/database-document"

export default function(
  order: DbDocumentInput<Order>,
  shipmentPriceDisplayed: Price
): Price
{
  const totalDiscountForShipment = getOrderDiscounts(order).reduce<Price>(
    (discountAmount, discount) =>
    {
      if (!!discount.percentageShipping)
      {
        return {
          ...discountAmount,
          amount: shipmentPriceDisplayed.amount * discount.percentageShipping,
        }
      }
      else if (!!discount.totalShipping)
      {
        return discount.totalShipping
      }
      return discountAmount
    },
    { ...NULL_PRICE, currency: shipmentPriceDisplayed.currency })
  return subtract(shipmentPriceDisplayed, totalDiscountForShipment)
}
