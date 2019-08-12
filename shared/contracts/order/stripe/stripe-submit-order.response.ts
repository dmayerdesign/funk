import * as Stripe from 'stripe'
import { Order } from '../order'

export interface StripeSubmitOrderResponse {
  order: Order
  stripeOrder: Stripe.orders.IOrder
}
