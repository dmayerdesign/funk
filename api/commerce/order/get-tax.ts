import getTotalBeforeTaxAndShippingImpl from
  "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import { ORDER_GET_TAX_MISSING_POSTAL_CODE } from "@funk/copy/error-messages"
import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import getShippingPostalCode from "@funk/model/commerce/order/behaviors/get-shipping-postal-code"
import { Price, NULL_PRICE } from "@funk/model/commerce/price/price"
import { SKUS } from "@funk/model/commerce/sku/sku"
import add from "@funk/model/commerce/price/behaviors/add"
import populateImpl from "@funk/api/plugins/persistence/behaviors/populate"
import getTaxRateForPostalCodeImpl from
  "@funk/api/plugins/tax/behaviors/get-tax-rate-for-postal-code"
import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"

export function construct(
  getTotalBeforeTaxAndShipping = getTotalBeforeTaxAndShippingImpl,
  populate = populateImpl,
  getTaxRateForPostalCode = getTaxRateForPostalCodeImpl
)
{
  return async function (order: Order | MarshalledOrder): Promise<Price>
  {
    const populatedOrder = await populate<Order, MarshalledOrder>(
      order as MarshalledOrder,
      [
        { key: "skus", collectionPath: SKUS },
        { key: "discounts", collectionPath: DISCOUNTS },
      ])

    const postalCode = throwInvalidInputIfNilOrEmpty(
      getShippingPostalCode(populatedOrder),
      ORDER_GET_TAX_MISSING_POSTAL_CODE
    )
    const taxRate = await getTaxRateForPostalCode(postalCode)
    const total = await getTotalBeforeTaxAndShipping(populatedOrder)

    return add(
      {
        amount: Math.ceil(total.amount * taxRate),
        currency: total.currency,
      },
      populatedOrder.additionalTaxAmount ?? NULL_PRICE
    )
  }
}

export default construct()

export type GetTax = ReturnType<typeof construct>
