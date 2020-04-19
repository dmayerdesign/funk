import getApplicableDiscountsForSkuImpl from
  '@funk/model/commerce/discount/actions/get-applicable-discounts-for-sku'
import { SkuDiscount } from '@funk/model/commerce/discount/discount'
import subtract from '@funk/model/commerce/price/actions/subtract'
import { Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'

/**
 * Computes a `Sku`'s actual price given all active discounts. Will only apply discounts
 * of type 'sku', as this is a `Sku`-level, not an `Order`-level, operation.
 *
 * @param activeDiscounts All discounts with a `startAt` less than, and an `endAt` greater
 * than, today's date, or any subset thereof. That filtering must be done before invoking
 * this function; it will not check `startAt` and `endAt` values.
 */
export function construct({
  getApplicableDiscountsForSku = getApplicableDiscountsForSkuImpl,
}: {
  getApplicableDiscountsForSku?: typeof getApplicableDiscountsForSkuImpl
}): (input: {
  sku: Sku,
  product: Product,
  activeDiscounts?: SkuDiscount[],
}) => Price
{
  return function(input: {
    sku: Sku,
    product: Product,
    activeDiscounts?: SkuDiscount[],
  }): Price
  {
    const { sku, product, activeDiscounts = [] } = input
    const applicableDiscounts = getApplicableDiscountsForSku(sku, product, activeDiscounts)
    return getSkuPriceAfterDiscounts(sku, applicableDiscounts)
  }
}

function getSkuPriceAfterDiscounts(sku: Sku, discounts: SkuDiscount[]): Price
{
  return discounts.reduce<Price>((calculatedPrice, discount) =>
  {
    if (!!discount.total)
    {
      return subtract(calculatedPrice, discount.total)
    }
    else if (!!discount.percentage)
    {
      return subtract(
        calculatedPrice,
        {
          ...calculatedPrice,
          amount: calculatedPrice.amount * discount.percentage,
        })
    }
    return calculatedPrice
  }, sku.price)
}

export default construct({})
