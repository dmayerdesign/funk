import { Price } from '@funk/model/commerce/price/price'
import { Timestamp } from '@funk/model/data-access/timestamp'

export interface Postage
{
  carrier: string
  rate: Price
  deliveryDateEstimate: string
  deliveryDateEstimateIsGuaranteed: boolean
  deliveredAt: Timestamp
  providerData: any
  shippingInsuranceAmount?: Price
  trackingCode?: string
}
