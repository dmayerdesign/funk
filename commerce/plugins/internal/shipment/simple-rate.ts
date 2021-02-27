import { Price } from "@funk/commerce/price/model/price"
import { Instant } from "@funk/time/model/instant"

export interface SimpleRate {
  name: string
  carrier: string
  price: Price
  deliveryDateEstimate: Instant
  deliveryDateEstimateIsGuaranteed: boolean
}
