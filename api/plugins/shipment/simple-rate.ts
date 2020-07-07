import { Price } from "@funk/model/commerce/price/price"
import { Timestamp } from "@funk/model/data-access/timestamp"

export interface SimpleRate {
  name: string
  carrier: string
  price: Price
  deliveryDateEstimate: Timestamp
  deliveryDateEstimateIsGuaranteed: boolean
}
