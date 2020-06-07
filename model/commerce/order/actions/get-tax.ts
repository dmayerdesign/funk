import throwInvalidInputIfNilOrEmpty from "@funk/helpers/throw-invalid-input-if-nil-or-empty"
import getShippingPostalCode from
  "@funk/model/commerce/order/actions/get-shipping-postal-code"
import { construct as createGetTotalBeforeTaxAndShipping } from
  "@funk/model/commerce/order/actions/get-total-before-tax-and-shipping"
import { PopulatedOrder } from "@funk/model/commerce/order/order"
import add from "@funk/model/commerce/price/actions/add"
import { NULL_PRICE, Price } from "@funk/model/commerce/price/price"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Sku } from "@funk/model/commerce/sku/sku"
import { DbDocumentInput } from "@funk/model/data-access/database-document"
import getTaxRateForPostalCodeImpl from "@funk/plugins/tax/actions/get-tax-rate-for-postal-code"

export function construct(
  getProductForSku: (sku: Sku) => Promise<MarshalledProduct | undefined>,
  getTaxRateForPostalCode = getTaxRateForPostalCodeImpl
)
{
  const getTotalBeforeTaxAndShipping = createGetTotalBeforeTaxAndShipping(getProductForSku)
  return async function(
    order: DbDocumentInput<PopulatedOrder>): Promise<Price>
  {
    const postalCode = throwInvalidInputIfNilOrEmpty(
      getShippingPostalCode(order),
      "No postal code found."
    )
    const taxRate = await getTaxRateForPostalCode(postalCode)
    const total = await getTotalBeforeTaxAndShipping(order)

    return add(
      {
        amount: Math.ceil(total.amount * taxRate),
        currency: total.currency,
      },
      order.additionalTaxAmount ?? NULL_PRICE
    )
  }
}
