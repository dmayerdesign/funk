import { Address } from "@funk/model/address/address"

export interface Customer
{
  userId: string
  idForPayment: string
  email: string
  firstName: string
  lastName: string
  shippingAddress: Address
  billingAddress: Address
  savePaymentInfo: boolean
}
