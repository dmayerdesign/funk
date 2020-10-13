import getPaymentProviderImpl from "@funk/api/plugins/payment/behaviors/get-payment-provider"
import { MIN_TRANSACTION_CENTS } from "@funk/api/plugins/payment/configuration"
import { PaymentIntent } from "@funk/api/plugins/payment/intent"
import { PaymentIntentInvalidPriceError } from "@funk/api/plugins/payment/validation"
import { Price } from "@funk/model/commerce/price/price"
import Stripe from "stripe"

export interface Options {
  price: Price
  savePaymentMethod: boolean
  idempotencyKey: string
  customerId?: string
  paymentMethodId?: string
  customerEmail?: string
}

export function construct(getPaymentProvider: typeof getPaymentProviderImpl) {
  return async function (options: Options): Promise<PaymentIntent> {
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
      payment_method_types: ["card"],
      setup_future_usage: (savePaymentMethod ? "off_session" : undefined) as
        | "off_session"
        | undefined,
      // Allows the client to confirm the payment intent
      // (https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment).
      confirmation_method: "automatic",
    }

    if (update.amount < MIN_TRANSACTION_CENTS) {
      throw new PaymentIntentInvalidPriceError(
        `Amount ${update.amount} is less than the minimum for a transaction.`
      )
    }

    const psp = await getPaymentProvider()
    return await psp.paymentIntents.create(update, { idempotencyKey })
  }
}

export default construct(getPaymentProviderImpl)

export type CreatePaymentIntent = ReturnType<typeof construct>
