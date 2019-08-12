import { DatabaseDocument } from '../data-access/database-document'
import { PrimaryKey } from '../data-access/primary-key'
import { Timestamp } from '../data-access/timestamp'
import { Price } from '../price/price'

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
  code?: string
  /** A positive amount is deducted from an order's shipping cost. */
  totalShipping?: Price
  /** A positive percentage is deducted from an order's shipping cost. */
  percentageShipping?: number
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
