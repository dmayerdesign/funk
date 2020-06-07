import { Price } from "@funk/model/commerce/price/price"
import { PaymentIntent } from "@funk/plugins/payment/intent"
import { GetPaymentProvider } from "@funk/plugins/payment/actions/get-payment-provider"

export interface Options {
  price?: Price
  customerId?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
  customerEmail?: string
}

export declare const construct: (deps: {
  paymentProviderSecret: string
  getPaymentProvider?: GetPaymentProvider
}) =>
(id: string, input: Options) => Promise<PaymentIntent>

export type UpdatePaymentIntent = ReturnType<typeof construct>
