import { GetPaymentProvider } from "@funk/plugins/payment/actions/get-payment-provider"

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

export function construct(
  getPaymentProvider: GetPaymentProvider
): (input: CreateInput | UpdateInput) => Promise<any>

export default function upsertCustomer(input: CreateInput | UpdateInput): Promise<any>

export type UpsertCustomer = ReturnType<typeof construct>
