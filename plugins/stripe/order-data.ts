import { CardToken } from './card-token'

export interface OrderData
{
  stripeCardId?: string
  stripeOrderId?: string
  stripeSource?: string
  stripeToken?: CardToken
}
