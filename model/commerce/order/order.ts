import { Discount } from '@funk/model/commerce/discount/discount'
import { EasypostRate } from '@funk/model/commerce/easypost-rate/easypost-rate'
import { Customer } from '@funk/model/commerce/order/customer'
import { Price } from '@funk/model/commerce/price/price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DatabaseDocument } from '@funk/model/data-access/database-document'

export enum Status
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
  skus: Sku[]
  subTotal: Price
  total: Price
  taxPercent: number
  paymentMethod: string
  status: Status
  customer: Customer
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
  paymentServiceProviderData?: any
}
