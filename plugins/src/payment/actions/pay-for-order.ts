import Stripe from 'stripe'

export interface Output
{
  order: Stripe.Order
}
