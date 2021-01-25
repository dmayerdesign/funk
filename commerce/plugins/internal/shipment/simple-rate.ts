import { Price } from "@funk/commerce/price/domain/price"
import { Timestamp } from "@funk/persistence/domain/timestamp"

export interface SimpleRate {
  name: string
  carrier: string
  price: Price
  deliveryDateEstimate: Timestamp
  deliveryDateEstimateIsGuaranteed: boolean
}
