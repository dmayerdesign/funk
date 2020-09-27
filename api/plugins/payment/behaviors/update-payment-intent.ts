import getPaymentProviderImpl from "@funk/api/plugins/payment/behaviors/get-payment-provider"
import { MIN_TRANSACTION_CENTS } from "@funk/api/plugins/payment/config"
import { PaymentIntent } from "@funk/api/plugins/payment/intent"
import { PaymentIntentInvalidPriceError } from "@funk/api/plugins/payment/validation"
import omitNullish from "@funk/helpers/omit-nullish"
import { Price } from "@funk/model/commerce/price/price"
import Stripe from "stripe"

export interface Options {
  price?: Price
  customerId?: string
  customerEmail?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
}

export function construct(
  getPaymentProvider = getPaymentProviderImpl
)
{
  return async function(id: string, options: Options): Promise<PaymentIntent>
  {
    const {
      price,
      customerId,
      paymentMethodId,
      savePaymentMethod,
      customerEmail,
    } = options
    const update = omitNullish<Stripe.PaymentIntentUpdateParams>({
      amount: price?.amount,
      currency: price?.currency,
      customer: customerId,
      receipt_email: customerEmail,
      payment_method: paymentMethodId,
      payment_method_types: [ "card" ],
      save_payment_method: savePaymentMethod,
      setup_future_usage: savePaymentMethod ? "off_session" : undefined,
    })

    if (update.amount && update.amount < MIN_TRANSACTION_CENTS)
    {
      throw new PaymentIntentInvalidPriceError(
        `Amount ${update.amount} is less than the minimum for a transaction.`)
    }

    const psp = await getPaymentProvider()
    return await psp.paymentIntents.update(id, update)
  }
}

export default construct()

export type UpdatePaymentIntent = ReturnType<typeof construct>
