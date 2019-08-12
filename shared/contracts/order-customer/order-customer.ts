import { Address } from '../address/address'

export interface OrderCustomer {
  uid?: string
  stripeCustomerId?: string
  email: string
  firstName: string
  lastName: string
  shippingAddress: Address
  billingAddress: Address
  savePaymentInfo: boolean
}
