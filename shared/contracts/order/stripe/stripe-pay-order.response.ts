import * as Stripe from 'stripe'
import { Order } from '../order'

export interface StripePayOrderResponse {
    paidOrder: Order
    paidStripeOrder: Stripe.orders.IOrder
}
