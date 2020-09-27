import getPaymentProviderImpl from "@funk/api/plugins/payment/behaviors/get-payment-provider"
import Stripe from "stripe"

export interface CreateInput {
  paymentProviderSecret: string
  customerData: Stripe.CustomerCreateParams
}
export interface UpdateInput {
  paymentProviderSecret: string
  id: string
  customerData: Stripe.CustomerUpdateParams
}

export function construct(getPaymentProvider = getPaymentProviderImpl)
{
  return async function(input: CreateInput | UpdateInput): Promise<Stripe.Customer>
  {
    const { paymentProviderSecret, customerData } = input,
      { id } = input as UpdateInput
    const stripe = getPaymentProvider(paymentProviderSecret)

    if (!!id)
    {
      return await stripe.customers.update(id, customerData)
    }
    else
    {
      return await stripe.customers.create(customerData)
    }
  }
}

export default construct()

export type UpsertCustomer = ReturnType<typeof construct>
