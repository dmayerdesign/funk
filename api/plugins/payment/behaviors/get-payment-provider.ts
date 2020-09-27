import Stripe from "stripe"

let provider: Stripe

export function construct(paymentServiceProviderCtor = Stripe)
{
  return function(secret: string, options = {} as Partial<Stripe.StripeConfig>): Stripe
  {
    return provider = provider || new paymentServiceProviderCtor(
      secret,
      {
        apiVersion: "2020-03-02",
        maxNetworkRetries: 2,
        ...options,
      }
    )
  }
}

export default construct()

export type GetPaymentProvider = ReturnType<typeof construct>
