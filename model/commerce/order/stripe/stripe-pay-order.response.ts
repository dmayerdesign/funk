import { Order } from '@funk/model/commerce/order/order'
import * as Stripe from 'stripe'

export interface StripePayOrderResponse {
    paidOrder: Order
    paidStripeOrder: Stripe.orders.IOrder
}
