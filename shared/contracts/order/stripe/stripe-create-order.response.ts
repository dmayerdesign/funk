import * as Stripe from 'stripe'
import { Order } from '../order'

export class StripeCreateOrderResponse {
    public order: Order
    public stripeOrder: Stripe.orders.IOrder

    constructor(stripeCreateOrderResponse: StripeCreateOrderResponse) {
        if (stripeCreateOrderResponse) {
            this.order = stripeCreateOrderResponse.order
            this.stripeOrder = stripeCreateOrderResponse.stripeOrder
        }
    }
}
