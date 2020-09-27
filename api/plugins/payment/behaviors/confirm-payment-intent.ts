import getPaymentProviderImpl from "@funk/api/plugins/payment/behaviors/get-payment-provider"
import { PaymentIntent } from "@funk/api/plugins/payment/intent"
import { Price } from "@funk/model/commerce/price/price"

export interface Options {
  price?: Price
  customerId?: string
  customerEmail?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
}

export function construct(
  paymentProviderSecret: string,
  getPaymentProvider = getPaymentProviderImpl
)
{
  const stripe = getPaymentProvider(paymentProviderSecret)

  return async function(id: string): Promise<PaymentIntent>
  {
    return await stripe.paymentIntents.confirm(id)
  }
}

export type ConfirmPaymentIntent = ReturnType<typeof construct>
