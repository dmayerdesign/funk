import createUid from '@funk/helpers/create-uid'
import Stripe from 'stripe'
import getPaymentProvider from './get-payment-provider'

export interface CreateInput
{
  stripeApiKey: string
  customerData: Stripe.CustomerCreateParams
}
export interface UpdateInput {
  stripeApiKey: string
  id: string
  customerData: Stripe.CustomerUpdateParams
}
export type Input = CreateInput & UpdateInput

export interface Output
{
  customer: Stripe.Customer
  idempotencyKey: string
}

export default async function({
  stripeApiKey,
  customerData,
  id,
}: Input): Promise<Output>
{
  const stripe = getPaymentProvider(stripeApiKey)
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
