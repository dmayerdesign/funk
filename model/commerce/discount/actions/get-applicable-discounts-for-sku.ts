import { Discount, SkuDiscount } from '@funk/model/commerce/discount/discount'
import { Product } from '@funk/model/commerce/product/product'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { sortBy } from 'lodash'

/**
 * Only one discount may be applied, unless one or more are `compoundable`.
 * Compoundable discounts will always override non-compoundable discounts.
 * Percentage discounts are always applied before amount discounts.
 * All else being equal, more-recently-started discount(s) will be favored.
 */
export default function(sku: Sku, product: Product, discounts: SkuDiscount[]): SkuDiscount[]
{
  return new ApplicableDiscountsBuilder(sku, product, discounts)
    .onlyAllowSkuDiscounts()
    .removeDiscountsThatExcludeThisProductOrSku()
    .removeDiscountsThatDoNotIncludeThisProductOrSku()
    .sortPercentageDiscountsFirst()
    .sortMostRecentlyStartedFirst()
    .onlyAllowOneUnlessCompoundable()
    .build()
}

class ApplicableDiscountsBuilder {
  private _applicableDiscounts: SkuDiscount[] = []

  constructor(
    private _sku: Sku,
    private _product: Product,
    discounts: SkuDiscount[],
  )
  {
    this._setInitialDiscounts(discounts)
  }

  private _setInitialDiscounts(discounts: SkuDiscount[]): void
  {
    this._applicableDiscounts = [ ...discounts ]
  }

  public onlyAllowSkuDiscounts(): this
  {
    this._applicableDiscounts = this._applicableDiscounts.filter((discount) =>
      (discount as Discount).type !== 'order')
    return this
  }

  public removeDiscountsThatExcludeThisProductOrSku(): this
  {
    this._applicableDiscounts = this._applicableDiscounts.filter((discount: SkuDiscount): boolean =>
    {
      if (!!discount.excludes)
      {
        if (discount.excludes.all) return false
        if (!!discount.excludes.skus)
        {
          if (discount.excludes.skus.indexOf(this._sku.id) > -1)
          {
            return false
          }
        }
        if (!!discount.excludes.taxonomyTerms)
        {
          if (!!discount.excludes.taxonomyTerms.find(
            (excludedTerm) => !!this._sku.taxonomyTerms.find(
              (term) => term === excludedTerm,
            ),
          ))
          {
            return false
          }
          if (!!discount.excludes.taxonomyTerms.find(
            (excludedTerm) => !!this._product.taxonomyTerms.find(
              (term) => term === excludedTerm,
            ),
          ))
          {
            return false
          }
        }
      }
      return true
    })
    return this
  }

  public removeDiscountsThatDoNotIncludeThisProductOrSku(): this
  {
    this._applicableDiscounts = this._applicableDiscounts.filter((discount: SkuDiscount): boolean =>
    {
      if (discount.includes.all) return true
      if (!!discount.includes.skus)
      {
        if (discount.includes.skus.indexOf(this._sku.id) > -1) return true
      }
      if (!!discount.includes.taxonomyTerms)
      {
        if (!!discount.includes.taxonomyTerms.find(
          (includedTerm) => !!this._sku.taxonomyTerms.find(
            (term) => term === includedTerm,
          ),
        ))
        {
          return true
        }
        if (!!discount.includes.taxonomyTerms.find(
          (includedTerm) => !!this._product.taxonomyTerms.find(
            (term) => term === includedTerm,
          ),
        ))
        {
          return true
        }
      }
      return false
    })
    return this
  }

  public sortPercentageDiscountsFirst(): this
  {
    this._applicableDiscounts = sortBy(
      this._applicableDiscounts,
      (element) => 1 / Math.ceil(element.percentage || 0))
    return this
  }

  public sortMostRecentlyStartedFirst(): this
  {
    this._applicableDiscounts = sortBy(
      this._applicableDiscounts,
      ({ startAt }) => Math.ceil(1 / startAt))
    return this
  }

  public onlyAllowOneUnlessCompoundable(): this
  {
    // Only allow a single discount to be applied.
    this._applicableDiscounts = (() =>
    {
      const discounts = this._applicableDiscounts
      if (discounts.length > 1)
      {
        if (discounts.some(({ isCompoundable }) => isCompoundable))
        {
          return discounts.filter(
            ({ isCompoundable }) => isCompoundable,
          )
        }
      }
      return discounts.slice(0, 1)
    })()
    return this
  }

  public build(): SkuDiscount[]
  {
    return this._applicableDiscounts
  }
}