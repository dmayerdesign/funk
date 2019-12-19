import { Price } from '@funk/model/commerce/price/price'

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
  paymentIntent: any
  idempotencyKey: string
}

export default function(input: Input): Promise<Output>
