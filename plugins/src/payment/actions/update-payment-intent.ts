import omitNullish from '@funk/helpers/omit-nullish'
import { Price } from '@funk/model/commerce/price/price'
import { MIN_TRANSACTION_CENTS } from '@funk/plugins/payment/config'
import { PaymentIntent } from '@funk/plugins/payment/intent'
import InvalidPaymentError from '@funk/plugins/payment/invalid-payment-error'
import Stripe from 'stripe'
import getPaymentProviderImpl from './get-payment-provider'

export interface Options {
  price?: Price
  customerId?: string
  customerEmail?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
}

export const construct = ({
  paymentProviderSecret,
  getPaymentProvider = getPaymentProviderImpl,
}: {
  paymentProviderSecret: string
  getPaymentProvider: typeof getPaymentProviderImpl
}) =>
{
  const stripe = getPaymentProvider(paymentProviderSecret)

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
      payment_method_types: [ 'card' ],
      save_payment_method: savePaymentMethod,
      setup_future_usage: (savePaymentMethod ? 'off_session' : undefined) as
        'off_session' | undefined,
    })

    if (update.amount && update.amount < MIN_TRANSACTION_CENTS)
    {
      throw new InvalidPaymentError(
        `Amount ${update.amount} is less than the minimum for a transaction.`)
    }

    return await stripe.paymentIntents.update(id, update)
  }
}
