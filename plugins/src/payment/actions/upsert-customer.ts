import createUid from '@funk/helpers/create-uid'
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
export type Input = CreateInput | UpdateInput

export interface Output
{
  customer: Stripe.Customer
  idempotencyKey: string
}

export const construct = ({
  getPaymentProvider = getPaymentProviderImpl,
} = {}) =>
  async function(input: Input): Promise<Output>
  {
    const { paymentProviderSecret, customerData } = input
    const { id } = input as UpdateInput
    const stripe = getPaymentProvider(paymentProviderSecret)
    const idempotencyKey = createUid()
    let customer: Stripe.Customer

    if (!!id)
    {
      customer = await stripe.customers.update(
        id,
        customerData,
        {
          idempotency_key: idempotencyKey,
        }
      )
    }
    else
    {
      customer = await stripe.customers.create(
        customerData,
        {
          idempotency_key: idempotencyKey,
        }
      )
    }
    return {
      customer,
      idempotencyKey,
    }
  }

export default construct()
