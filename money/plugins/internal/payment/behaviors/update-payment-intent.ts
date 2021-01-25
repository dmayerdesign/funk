import { Price } from "@funk/commerce/price/domain/price"
import omitNullish from "@funk/helpers/omit-nullish"
import getPaymentProviderImpl from "@funk/money/plugins/internal/payment/behaviors/get-payment-provider"
import { MIN_TRANSACTION_CENTS } from "@funk/money/plugins/internal/payment/configuration"
import { PaymentIntent } from "@funk/money/plugins/internal/payment/intent"
import { PaymentIntentInvalidPriceError } from "@funk/money/plugins/internal/payment/validation"
import Stripe from "stripe"

export interface Options {
  price?: Price
  customerId?: string
  customerEmail?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
}

export function construct(getPaymentProvider: typeof getPaymentProviderImpl) {
  return async function (id: string, options: Options): Promise<PaymentIntent> {
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
      payment_method_types: ["card"],
      setup_future_usage: savePaymentMethod ? "off_session" : undefined,
    })

    if (update.amount && update.amount < MIN_TRANSACTION_CENTS) {
      throw new PaymentIntentInvalidPriceError(
        `Amount ${update.amount} is less than the minimum for a transaction.`,
      )
    }

    const psp = await getPaymentProvider()
    return await psp.paymentIntents.update(id, update)
  }
}

export default construct(getPaymentProviderImpl)

export type UpdatePaymentIntent = ReturnType<typeof construct>
