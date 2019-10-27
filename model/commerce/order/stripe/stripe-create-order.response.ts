import { Order } from '@funk/model/commerce/order/order'
import * as Stripe from 'stripe'

export interface StripeCreateOrderResponse {
  order: Order
  stripeOrder: Stripe.orders.IOrder
}
