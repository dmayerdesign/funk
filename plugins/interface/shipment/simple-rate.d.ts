import { Price } from "@funk/model/commerce/price/price"
import { Timestamp } from "@funk/model/data-access/timestamp"

export interface SimpleRate {
  name: string // E.g. "Two-day"
  carrier: string
  price: Price
  deliveryDateEstimate: Timestamp
  deliveryDateEstimateIsGuaranteed: boolean
}
