import { Address } from '@funk/model/address/address'

export interface Customer
{
  uid: string
  idForPayment: string
  email: string
  firstName: string
  lastName: string
  shippingAddress: Address
  billingAddress: Address
  savePaymentInfo: boolean
}
