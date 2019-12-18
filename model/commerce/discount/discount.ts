import { Price } from '@funk/model/commerce/price/price'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'

export const DISCOUNTS = 'commerce.discounts'

export interface DiscountRules
{
  all?: boolean
  skus?: PrimaryKey[]
  taxonomyTerms?: PrimaryKey[]
}

interface BaseDiscount extends DatabaseDocument
{
  /** A positive amount is deducted from the `Order` total or `Product` price. */
  total?: Price
  /** A positive percentage is deducted from the `Order` total or `Product` price. */
  percentage?: number
  isCompoundable?: boolean
  includes: DiscountRules
  /** An optional list of exclusion rules. These will always override `includes`. */
  excludes?: DiscountRules
  startAt: Timestamp
  endAt?: Timestamp
  /** The discount will not apply to products priced below this amount. */
  preDiscountProductPriceThreshold?: Price
}

export interface SkuDiscount extends BaseDiscount
{
  /** A 'sku' discount is a sale; an 'order' discount is a coupon. */
  type: 'sku'
}

export interface OrderDiscount extends BaseDiscount
{
  /** A 'sku' discount is a sale; an 'order' discount is a coupon. */
  type: 'order'
  /** A positive amount is deducted from an `Order`'s shipping cost. */
  totalShipping?: Price
  /** A positive percentage is deducted from an `Order`'s shipping cost. */
  percentageShipping?: number
  code?: string
  orderTotalUpperLimit?: Price
  orderTotalLowerLimit?: Price
  productCountLimit?: number
  preDiscountProductCountThreshold?: number
}

export type Discount = SkuDiscount | OrderDiscount
