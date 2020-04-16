import Stripe from 'stripe'

let provider: Stripe

export const construct = (paymentServiceProviderCtor = Stripe) =>
  function(secret: string, options = {} as Stripe.StripeConfig): Stripe
  {
    return provider = provider || new paymentServiceProviderCtor(
      secret,
      {
        apiVersion: '2019-12-03',
        maxNetworkRetries: 2,
        ...options,
      },
    )
  }

export default construct()
