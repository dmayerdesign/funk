import { Price } from '@funk/model/commerce/price/price'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'

export interface DiscountRules {
  all?: boolean
  products?: PrimaryKey[]
  taxonomyTerms?: PrimaryKey[]
}

export interface Discount extends DatabaseDocument {
  /** A positive amount is deducted from the Product's price. */
  total?: Price
  /** A positive percentage is deducted from the Product's price. */
  percentage?: number
  /** A positive amount is deducted from an order's shipping cost. */
  totalShipping?: Price
  /** A positive percentage is deducted from an order's shipping cost. */
  percentageShipping?: number
  code?: string
  includes: DiscountRules
  excludes?: DiscountRules
  startAt?: Timestamp
  endAt?: Timestamp
  orderTotalUpperLimit?: Price
  orderTotalLowerLimit?: Price
  productCountLimit?: number
  preDiscountProductCountThreshold?: number
  preDiscountProductPriceThreshold?: number
}
