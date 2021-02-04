import { Price } from "@funk/commerce/price/model/price"
import { Timestamp } from "@funk/persistence/model/timestamp"

export interface SimpleRate {
  name: string
  carrier: string
  price: Price
  deliveryDateEstimate: Timestamp
  deliveryDateEstimateIsGuaranteed: boolean
}
