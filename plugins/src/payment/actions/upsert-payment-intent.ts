import { Price } from '@funk/model/commerce/price/price'
import Stripe, { paymentIntents } from 'stripe'
const uuid = require('uuid/v4')

export interface CreateInput
{
  paymentSecretKey: string
  price: Price
  customerId?: string
  paymentMethodId?: string
  savePaymentMethod: boolean
}
export interface UpdateInput {
  paymentIntentId: string
  paymentSecretKey: string
  idempotencyKey: string
  price?: Price
  customerId?: string
  paymentMethodId?: string
  savePaymentMethod?: boolean
}
export type Input = CreateInput | UpdateInput

export interface Output
{
  paymentIntent: paymentIntents.IPaymentIntent
  idempotencyKey: string
}

export default async function(input: Input): Promise<Output>
{
  const {
    paymentIntentId,
    paymentSecretKey: stripeApiKey,
    price,
    customerId,
    paymentMethodId,
    savePaymentMethod,
    idempotencyKey,
  } = input as CreateInput & UpdateInput
  const stripe = new Stripe(stripeApiKey)
  let paymentIntent: paymentIntents.IPaymentIntent
  let _idempotencyKey = idempotencyKey

  if (!!paymentIntentId)
  {
    paymentIntent = await stripe.paymentIntents.update(
      paymentIntentId,
      {
        amount: price.amount,
        currency: price.currency,
        customer: customerId,
        payment_method: paymentMethodId,
        payment_method_types: [ 'card' ],
        save_payment_method: savePaymentMethod,
        setup_future_usage: savePaymentMethod ? 'off_session' : undefined,
      },
      {
        idempotency_key: _idempotencyKey,
      }
    )
  }
  else
  {
    _idempotencyKey = uuid()
    paymentIntent = await stripe.paymentIntents.create(
      {
        amount: price.amount,
        currency: price.currency,
        customer: customerId,
        payment_method: paymentMethodId,
        payment_method_types: [ 'card' ],
        save_payment_method: savePaymentMethod,
        setup_future_usage: savePaymentMethod ? 'off_session' : undefined,
        // Allows the client to confirm the payment intent
        // (https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment).
        confirmation_method: 'automatic',
      },
      {
        idempotency_key: _idempotencyKey,
      }
    )
  }
  return {
    paymentIntent,
    idempotencyKey: _idempotencyKey,
  }
}
