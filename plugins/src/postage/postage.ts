import { Price } from '@funk/model/commerce/price/price'
import { Timestamp } from '@funk/model/data-access/timestamp'
import { EasypostRate } from './details/easypost-rate'

export interface Postage
{
  carrier: string
  rate: Price
  deliveryDateEstimate: string
  deliveryDateEstimateIsGuaranteed: boolean
  deliveredAt: Timestamp
  providerData: EasypostRate
  shippingInsuranceAmount?: Price
  trackingCode?: string
}
