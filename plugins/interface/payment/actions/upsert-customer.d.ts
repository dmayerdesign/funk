export interface CreateInput
{
  paymentApiKey: string
  customerData: any
}
export interface UpdateInput {
  paymentApiKey: string
  id: string
  customerData: any
}
export type Input = CreateInput & UpdateInput

export interface Output
{
  customer: any
  idempotencyKey: string
}

export default function({
  paymentApiKey,
  customerData,
  id,
}: Input): Promise<Output>
