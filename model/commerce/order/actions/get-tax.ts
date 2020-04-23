import getTotalBeforeTaxImpl from '@funk/model/commerce/order/actions/get-total-before-tax'
import { PopulatedOrder } from '@funk/model/commerce/order/order'
import add from '@funk/model/commerce/price/actions/add'
import { NULL_PRICE, Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DbDocumentInput } from '@funk/model/data-access/database-document'
import getTaxRateForPostalCodeImpl from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'

export interface Input
{
  order: DbDocumentInput<PopulatedOrder>
  postalCode: string
  getProductForSku: (sku: Sku) => Promise<Product>
}

export type Output = Promise<Price>

export const construct = ({
  getTotalBeforeTax = getTotalBeforeTaxImpl,
  getTaxRateForPostalCode = getTaxRateForPostalCodeImpl,
} = {}) =>
{
  return async function(input: Input): Output
  {
    const { order, getProductForSku, postalCode } = input
    const taxRate = await getTaxRateForPostalCode({ postalCode })
    const total = await getTotalBeforeTax({ order, getProductForSku })

    return add(
      {
        amount: Math.ceil(total.amount * taxRate),
        currency: total.currency,
      },
      order.additionalTaxAmount ?? NULL_PRICE,
    )
  }
}

export default construct()
