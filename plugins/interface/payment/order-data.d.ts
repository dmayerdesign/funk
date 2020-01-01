import { Price } from '@funk/model/commerce/price/price'

export interface OrderData
{
  paymentIntentId: string
  total: Price
}
