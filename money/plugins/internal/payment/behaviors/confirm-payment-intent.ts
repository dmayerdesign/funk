import { Price } from "@funk/commerce/price/domain/price"
import getPaymentProviderImpl from "@funk/money/plugins/internal/payment/behaviors/get-payment-provider"
import { MIN_TRANSACTION_CENTS } from "@funk/money/plugins/internal/payment/configuration"
import { PaymentIntent } from "@funk/money/plugins/internal/payment/intent"
import { PaymentIntentInvalidPriceError } from "@funk/money/plugins/internal/payment/validation"

export interface Options {
  price?: Price
  customerId?: string
  customerEmail?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
}

export function construct(getPaymentProvider: typeof getPaymentProviderImpl) {
  return async function (id: string): Promise<PaymentIntent> {
    const psp = await getPaymentProvider()
    const paymentIntent = await psp.paymentIntents.retrieve(id)

    if (paymentIntent.amount < MIN_TRANSACTION_CENTS) {
      throw new PaymentIntentInvalidPriceError(
        `Amount ${paymentIntent.amount} is less than the minimum for a transaction.`,
      )
    }

    return await psp.paymentIntents.confirm(id)
  }
}

export default construct(getPaymentProviderImpl)

export type ConfirmPaymentIntent = ReturnType<typeof construct>
