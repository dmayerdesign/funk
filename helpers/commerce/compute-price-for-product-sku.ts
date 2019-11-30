import CurrencyMismatchError from '@funk/helpers/commerce/currency-mismatch-error'
import { Discount } from '@funk/model/commerce/discount/discount'
import { Price } from '@funk/model/commerce/price/price'
import { Product } from '@funk/model/commerce/product/product'
import { ProductSku } from '@funk/model/commerce/product/product-sku'

/**
 * Computes a `ProductSku`'s actual price given all active discounts. Will only apply
 * discounts of type 'product', as this is a `ProductSku`-level operation.
 *
 * @param activeDiscounts All discounts with a `startAt` less than, and an `endAt` greater
 * than, today's date, or any subset thereof. That filtering must be done before invoking
 * this function; it will not check `startAt` and `endAt` values.
 */
export default function(
  productSku: ProductSku,
  parentProduct: Product,
  activeDiscounts: Discount[] = [],
): Price
{
  /**
   * Creates a subset of the provided `activeDiscounts` which
   * - are of type 'product' AND
   * - do not exclude this `ProductSku` AND
   * - do not exclude the associated `TaxonomyTerms` AND
   * - include this `ProductSku` OR include an associated `TaxonomyTerm`.
   */
  let applicableDiscounts = activeDiscounts.filter((discount) =>
  {
    if (discount.type === 'order')
    {
      return false
    }
    if (!!discount.excludes)
    {
      if (discount.excludes.all) return false
      if (!!discount.excludes.productSkus)
      {
        if (discount.excludes.productSkus.indexOf(productSku.id) > -1)
        {
          return false
        }
      }
      if (!!discount.excludes.taxonomyTerms)
      {
        if (!!discount.excludes.taxonomyTerms.find(
          (excludedTerm) => !!productSku.taxonomyTerms.find(
            (term) => term === excludedTerm,
          ),
        ))
        {
          return false
        }
      }
    }
    if (discount.includes.all) return true
    if (!!discount.includes.productSkus)
    {
      if (discount.includes.productSkus.indexOf(productSku.id) > -1) return true
    }
    if (!!discount.includes.taxonomyTerms)
    {
      if (!!discount.includes.taxonomyTerms.find(
        (includedTerm) => !!productSku.taxonomyTerms.find(
          (term) => term === includedTerm,
        ),
      ))
      {
        return true
      }
      if (!!discount.includes.taxonomyTerms.find(
        (includedTerm) => !!parentProduct.taxonomyTerms.find(
          (term) => term === includedTerm,
        ),
      ))
      {
        return true
      }
    }
    return false
  })

  // Only allow a single discount to be applied, unless one or more are compoundable.
  // Compoundable discounts will always override non-compoundable discounts.
  // All else being equal, more-recently-started discount(s) will be favored.
  if (applicableDiscounts.length > 1)
  {
    if (applicableDiscounts.some(({ isCompoundable }) => isCompoundable))
    {
      applicableDiscounts = applicableDiscounts.filter(
        ({ isCompoundable }) => isCompoundable,
      )
    }
    else
    {
      applicableDiscounts = applicableDiscounts
        .sort((a, b) => a.startAt <= b.startAt ? -1 : 1)
        .slice(0, 1)
    }
  }

  return applicableDiscounts.reduce<Price>((calculatedPrice, discount) =>
  {
    if (!!discount.total)
    {
      if (calculatedPrice.currency !== discount.total.currency)
      {
        throw new CurrencyMismatchError()
      }
      return {
        ...calculatedPrice,
        amount: calculatedPrice.amount - discount.total.amount,
      }
    }
    else
    {
      if (!discount.percentage)
      {
        discount.percentage = 0
      }
      return {
        ...calculatedPrice,
        amount: calculatedPrice.amount - (calculatedPrice.amount * discount.percentage),
      }
    }
  }, productSku.price)
}
