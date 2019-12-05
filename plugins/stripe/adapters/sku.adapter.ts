import { Discount } from '@funk/model/commerce/discount/discount'
import { Product } from '@funk/model/commerce/product/product'
import getActualPrice from '@funk/model/commerce/product/sku/actions/get-actual-price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { validate } from '@funk/model/commerce/product/sku/validation'
import { skus } from 'stripe'

export default function(
  sku: Sku,
  product: Product,
  discounts?: Discount[]
): skus.ISkuCreationOptions
{
  validate(sku)
  const { amount, currency } = getActualPrice(sku, product, discounts)
  return {
    id: sku.id,
    currency: currency,
    inventory: sku.inventory,
    price: amount,
    product: product.id, // Must be a product of type 'good'.
    active: true,
    /** TODO: Make human-readable */
    attributes: Object.keys(sku.attributeValues).reduce(
      (attributes, attributeKey) =>
      {
        const attribute = sku.attributeValues[attributeKey]
        attributes[attributeKey] = attribute.attributeValueId
          || attribute.stringValue
          || `${attribute.numberValue}`
        return attributes
      },
      {} as { [key: string]: string }
    ),
  }
}
