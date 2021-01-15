import getPaymentProviderImpl from "@funk/api/plugins/payment/behaviors/get-payment-provider"
import Stripe from "stripe"

export interface CreateInput {
  paymentProviderSecret: string
  customerData: Stripe.CustomerCreateParams
}
export interface UpdateInput {
  id: string
  customerData: Stripe.CustomerUpdateParams
}

export function construct(getPaymentProvider: typeof getPaymentProviderImpl) {
  return async function (
    input: CreateInput | UpdateInput,
  ): Promise<Stripe.Customer> {
    const { customerData } = input,
      { id } = input as UpdateInput
    const stripe = await getPaymentProvider()

    if (!!id) {
      return await stripe.customers.update(id, customerData)
    } else {
      return await stripe.customers.create(customerData)
    }
  }
}

export default construct(getPaymentProviderImpl)

export type UpsertCustomer = ReturnType<typeof construct>
