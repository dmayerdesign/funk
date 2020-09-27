import { construct as constructConfirmPaymentIntentImpl } from "@funk/api/plugins/payment/behaviors/confirm-payment-intent"
import getByIdImpl, { GetById } from "@funk/api/plugins/persistence/behaviors/get-by-id"
import getSecretImpl, { GetSecret } from "@funk/api/plugins/secrets/behaviors/get-secret"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"

export function construct(
  getById: GetById,
  getSecret: GetSecret,
  constructConfirmPaymentIntent: typeof constructConfirmPaymentIntentImpl
)
{
  return async function (orderId: string)
  {
    const order = await getById<MarshalledOrder>(ORDERS, orderId)
    const paymentServiceProviderSecret = await getSecret(PAYMENT_SERVICE_PROVIDER_SECRET_KEY)
    const confirmPaymentIntent = constructConfirmPaymentIntent(paymentServiceProviderSecret!)

    await confirmPaymentIntent(order!.paymentIntentId!)
  }
}

export type Submit = ReturnType<typeof construct>

export default construct(getByIdImpl, getSecretImpl, constructConfirmPaymentIntentImpl)
