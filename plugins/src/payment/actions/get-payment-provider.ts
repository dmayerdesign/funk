import Stripe from 'stripe'

let provider: Stripe

export default function(secret: string, options = {} as Stripe.StripeConfig): Stripe
{
  return provider = provider || new Stripe(
    secret,
    {
      apiVersion: '2019-12-03',
      maxNetworkRetries: 2,
      ...options,
    },
  )
}
