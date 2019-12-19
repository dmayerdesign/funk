import { Discount } from '@funk/model/commerce/discount/discount'
import { EasypostRate } from '@funk/model/commerce/easypost-rate/easypost-rate'
import { Customer } from '@funk/model/commerce/order/customer'
import { Price } from '@funk/model/commerce/price/price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'

export const ORDERS = 'commerce.orders'

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

interface BaseOrder extends DatabaseDocument
{
  customer: Customer
  subTotal: Price
  total: Price
  taxPercent: number
  paymentMethod: string
  status: Status
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
  paymentData?: any
  idempotencyKey?: string
}

export interface PopulatedOrder extends BaseOrder
{
  skus: Sku[]
  discounts?: Discount[]
}

export interface MarshalledOrder extends BaseOrder
{
  skus: PrimaryKey[]
  discounts?: PrimaryKey[]
}

export type Order = PopulatedOrder | MarshalledOrder
