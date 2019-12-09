import Stripe from 'stripe'

export interface Input
{
  productId: string
  stripeApiKey: string
}

export type Output = boolean

export default async function({ productId, stripeApiKey }: Input): Promise<Output>
{
  const stripe = new Stripe(stripeApiKey)
  try
  {
    const product = await stripe.products.retrieve(productId)
    return !!product
  }
  catch
  {
    return false
  }
}
