import Stripe, { customers } from 'stripe'
const uuid = require('uuid/v4')

export interface CreateInput
{
  stripeApiKey: string
  customerData: customers.ICustomerCreationOptions
}
export interface UpdateInput {
  stripeApiKey: string
  id: string
  customerData: customers.ICustomerUpdateOptions
}
export type Input = CreateInput & UpdateInput

export interface Output
{
  customer: customers.ICustomer
  idempotencyKey: string
}

export default async function({
  stripeApiKey,
  customerData,
  id,
}: Input): Promise<Output>
{
  const stripe = new Stripe(stripeApiKey)
  const idempotencyKey = uuid()
  let customer: customers.ICustomer

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
