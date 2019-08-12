import * as Stripe from 'stripe'
import { Order } from '../order'

export interface StripeCreateOrderResponse {
  order: Order
  stripeOrder: Stripe.orders.IOrder
}
