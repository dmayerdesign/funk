import { PopulatedOrder } from '@funk/model/commerce/order/order'
import add from '@funk/model/commerce/price/actions/add'
import { NULL_PRICE, Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import getTaxRateForPostalCode from '@funk/plugins/tax/actions/get-tax-rate-for-postal-code'
import getTotalBeforeTax from './get-total-before-tax'

export interface Input
{
  order: PopulatedOrder
  postalCode: string
  getProductForSku: (sku: Sku) => Promise<Product>
}

export type Output = Price

export default async function(input: Input): Promise<Output>
{
  const { order, getProductForSku, postalCode } = input
  const taxRate = await getTaxRateForPostalCode({ postalCode })
  const total = await getTotalBeforeTax({ order, getProductForSku })

  return add(
    {
      amount: total.amount * taxRate,
      currency: total.currency,
    },
    getAdditionalTaxPrice()
  )

  function getAdditionalTaxPrice(): Price
  {
    if (order.additionalTaxAmount) return order.additionalTaxAmount
    return NULL_PRICE
  }
}

