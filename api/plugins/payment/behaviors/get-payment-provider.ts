import getSecretImpl from "@funk/api/plugins/secrets/behaviors/get-secret"
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"
import Stripe from "stripe"

let provider: Stripe

export function construct(
  getSecret: typeof getSecretImpl
)
{
  return async function(options = {} as Partial<Stripe.StripeConfig>): Promise<Stripe>
  {
    const secret = await getSecret(PAYMENT_SERVICE_PROVIDER_SECRET_KEY)
    return provider = provider ?? new Stripe(
      secret!,
      {
        apiVersion: "2020-03-02",
        maxNetworkRetries: 2,
        ...options,
      }
    )
  }
}

export default construct(getSecretImpl)

export type GetPaymentProvider = ReturnType<typeof construct>
