import { Price } from "@funk/model/commerce/price/price"
import { MIN_TRANSACTION_CENTS } from "@funk/plugins/payment/config"
import { PaymentIntent } from "@funk/plugins/payment/intent"
import { PaymentIntentInvalidPriceError } from "@funk/plugins/payment/validation"
import Stripe from "stripe"
import getPaymentProviderImpl from "./get-payment-provider"

export interface Options {
  price: Price
  savePaymentMethod: boolean
  idempotencyKey: string
  customerId?: string
  paymentMethodId?: string
  customerEmail?: string
}

export function construct({
  paymentProviderSecret,
  getPaymentProvider = getPaymentProviderImpl,
}: {
  paymentProviderSecret: string
  getPaymentProvider?: typeof getPaymentProviderImpl
})
{
  const stripe = getPaymentProvider(paymentProviderSecret)

  return async function(options: Options): Promise<PaymentIntent>
  {
    const {
      price,
      savePaymentMethod,
      idempotencyKey,
      customerId,
      paymentMethodId,
      customerEmail,
    } = options
    const update: Stripe.PaymentIntentCreateParams = {
      amount: price.amount,
      currency: price.currency,
      customer: customerId,
      receipt_email: customerEmail,
      payment_method: paymentMethodId,
      payment_method_types: [ "card" ],
      save_payment_method: savePaymentMethod,
      setup_future_usage: (savePaymentMethod ? "off_session" : undefined) as
        "off_session" | undefined,
      // Allows the client to confirm the payment intent
      // (https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment).
      confirmation_method: "automatic",
    }

    if (update.amount < MIN_TRANSACTION_CENTS)
    {
      throw new PaymentIntentInvalidPriceError(
        `Amount ${update.amount} is less than the minimum for a transaction.`)
    }

    return await stripe.paymentIntents.create(
      update,
      { idempotencyKey }
    )
  }
}

export type CreatePaymentIntent = ReturnType<typeof construct>
