import Stripe from 'stripe'
import getPaymentProviderImpl from './get-payment-provider'

export interface CreateInput
{
  paymentProviderSecret: string
  customerData: Stripe.CustomerCreateParams
}
export interface UpdateInput {
  paymentProviderSecret: string
  id: string
  customerData: Stripe.CustomerUpdateParams
}

export const construct = ({
  getPaymentProvider = getPaymentProviderImpl,
} = {}) =>
  async function(input: CreateInput | UpdateInput): Promise<Stripe.Customer>
  {
    const { paymentProviderSecret, customerData } = input,
          { id } = input as UpdateInput
    const stripe = getPaymentProvider(paymentProviderSecret)
    let customer: Stripe.Customer

    if (!!id)
    {
      return customer = await stripe.customers.update(id, customerData)
    }
    else
    {
      return customer = await stripe.customers.create(customerData)
    }
  }

export default construct()
