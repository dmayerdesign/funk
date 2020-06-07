import { Price } from "@funk/model/commerce/price/price"
import { PaymentIntent } from "@funk/plugins/payment/intent"
import GetPaymentProvider from "@funk/plugins/payment/actions/get-payment-provider"

export interface Options {
  price: Price
  savePaymentMethod: boolean
  customerId?: string
  paymentMethodId?: string
  customerEmail?: string
}

export declare const construct: (deps: {
  paymentProviderSecret: string
  getPaymentProvider?: GetPaymentProvider
}) =>
(options: Options) => Promise<PaymentIntent>

export type CreatePaymentIntent = ReturnType<typeof construct>
