import { DatabaseDocument } from '../data-access/database-document'
import { Discount } from '../discount/discount'
import { EasypostRate } from '../easypost-rate/easypost-rate'
import { OrderCustomer } from '../order-customer/order-customer'
import { Price } from '../price/price'
import { Product } from '../product/product'
import { StripeCardToken } from '../stripe-card-token/stripe-card-token'

export enum OrderStatus {
  PRE_SUBMIT_INVALID = 'Invalid',
  PRE_SUBMIT_VALID = 'Valid',
  PENDING = 'Pending',
  PAID = 'Paid',
  SHIPPED = 'Shipped',
  RECEIVED = 'Received',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded',
  RETURNED = 'Returned',
}

export interface Order extends DatabaseDocument {
  products: Product[]
  subTotal: Price
  total: Price
  taxPercent: number
  paymentMethod: string
  status: OrderStatus
  discounts?: Discount[]
  shippingCost?: Price
  shippingRates?: EasypostRate[]
  selectedShippingRateId?: string
  shippingInsuranceAmt?: number
  carrier?: string
  trackingCode?: string
  estDeliveryDays?: number
  postageLabelUrl?: string
  savePaymentInfo?: boolean
  shipmentId?: string
  stripeCardId?: string
  stripeOrderId?: string
  stripeSource?: string
  stripeToken?: StripeCardToken
  customer?: OrderCustomer
}
