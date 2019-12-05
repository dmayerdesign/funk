import { Address } from '@funk/model/address/address'

export interface Customer
{
  uid?: string
  email: string
  firstName: string
  lastName: string
  shippingAddress: Address
  billingAddress: Address
  savePaymentInfo: boolean
  idForPaymentServiceProvider: string
}
