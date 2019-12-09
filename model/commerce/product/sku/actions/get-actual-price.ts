import { Discount } from '@funk/model/commerce/discount/discount'
import { Price } from '@funk/model/commerce/price/price'
import { validateBeforeMath } from '@funk/model/commerce/price/validation'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'

/**
 * Computes a `Sku`'s actual price given all active discounts. Will only apply discounts
 * of type 'sku', as this is a `Sku`-level, not an `Order`-level, operation.
 *
 * @param activeDiscounts All discounts with a `startAt` less than, and an `endAt` greater
 * than, today's date, or any subset thereof. That filtering must be done before invoking
 * this function; it will not check `startAt` and `endAt` values.
 *
 * Only one discount may be applied, unless one or more are `compoundable`.
 * Compoundable discounts will always override non-compoundable discounts.
 * All else being equal, more-recently-started discount(s) will be favored.
 */
export default function(
  sku: Sku,
  parentProduct: Product,
  activeDiscounts: Discount[] = [],
): Price
{
  let applicableDiscounts = activeDiscounts.filter((discount) =>
  {
    if (discount.type === 'order')
    {
      return false
    }
    if (!!discount.excludes)
    {
      if (discount.excludes.all) return false
      if (!!discount.excludes.skus)
      {
        if (discount.excludes.skus.indexOf(sku.id) > -1)
        {
          return false
        }
      }
      if (!!discount.excludes.taxonomyTerms)
      {
        if (!!discount.excludes.taxonomyTerms.find(
          (excludedTerm) => !!sku.taxonomyTerms.find(
            (term) => term === excludedTerm,
          ),
        ))
        {
          return false
        }
      }
    }
    if (discount.includes.all) return true
    if (!!discount.includes.skus)
    {
      if (discount.includes.skus.indexOf(sku.id) > -1) return true
    }
    if (!!discount.includes.taxonomyTerms)
    {
      if (!!discount.includes.taxonomyTerms.find(
        (includedTerm) => !!sku.taxonomyTerms.find(
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

  // Only allow a single discount to be applied.
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
      validateBeforeMath(calculatedPrice, discount.total)
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
  }, sku.price)
}
