import { Discount } from '@funk/model/commerce/discount/discount'
import { EasypostRate } from '@funk/model/commerce/easypost-rate/easypost-rate'
import { OrderCustomer } from '@funk/model/commerce/order-customer/order-customer'
import { Price } from '@funk/model/commerce/price/price'
import { StripeCardToken } from '@funk/model/commerce/stripe-card-token/stripe-card-token'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { ProductSku } from '../product/product-sku'

export enum OrderStatus
{
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

export interface Order extends DatabaseDocument
{
  productSkus: ProductSku[]
  subTotal: Price
  total: Price
  taxPercent: number
  paymentMethod: string
  status: OrderStatus
  customer: OrderCustomer
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
}
