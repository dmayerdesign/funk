import throwInvalidInputIfNullish from '@funk/helpers/throw-invalid-input-if-nullish'
import getShippingPostalCodeImpl from
  '@funk/model/commerce/order/actions/get-shipping-postal-code'
import { construct as createGetTotalBeforeTax } from
  '@funk/model/commerce/order/actions/get-total-before-tax-and-shipping'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import add from '@funk/model/commerce/price/actions/add'
import { NULL_PRICE, Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import getTaxRateForPostalCodeImpl from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

export const construct = ({
  getTaxRateForPostalCode = getTaxRateForPostalCodeImpl,
  getShippingPostalCode = getShippingPostalCodeImpl,
  getProductForSku,
}: {
  getTaxRateForPostalCode?: typeof getTaxRateForPostalCodeImpl,
  getShippingPostalCode?: typeof getShippingPostalCodeImpl,
  getProductForSku: (sku: Sku) => Promise<Product>,
}) =>
{
  const getTotalBeforeTax = createGetTotalBeforeTax({ getProductForSku })
  return async function(
    order: DbDocumentInput<PopulatedOrder>): Promise<Price>
  {
    const postalCode = throwInvalidInputIfNullish(
      getShippingPostalCode(order),
      `No postal code found.`,
    )
    const taxRate = await getTaxRateForPostalCode(postalCode)
    const total = await getTotalBeforeTax(order)

    return add(
      {
        amount: Math.ceil(total.amount * taxRate),
        currency: total.currency,
      },
      order.additionalTaxAmount ?? NULL_PRICE,
    )
  }
}
