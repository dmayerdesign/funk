import GetPaymentProvider from '@funk/plugins/payment/actions/get-payment-provider'

export interface CreateInput
{
  paymentProviderSecret: string
  customerData: any
}
export interface UpdateInput {
  paymentProviderSecret: string
  id: string
  customerData: any
}
export type Input = CreateInput | UpdateInput

export interface Output
{
  customer: any
  idempotencyKey: string
}

export function construct(deps: {
  getPaymentProvider: GetPaymentProvider,
}): (input: Input) => Promise<Output>

declare function upsertCustomer(input: Input): Promise<Output>

export default upsertCustomer
