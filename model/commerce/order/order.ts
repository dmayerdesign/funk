import { Discount } from '@funk/model/commerce/discount/discount'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Price } from '@funk/model/commerce/price/price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { OrderData } from '@funk/plugins/payment/order-data'
import { Postage } from '@funk/plugins/postage/postage'

export const ORDERS = 'commerce.orders'

export enum Status
{
  CART = 'Cart',
  PAYMENT_PENDING = 'Payment pending',
  PAID = 'Paid',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  CANCELLED_REFUNDED = 'Refunded due to cancellation',
  RETURNED = 'Returned',
  RETURNED_REFUNDED = 'Refunded upon return',
}

interface BaseOrder extends DatabaseDocument
{
  customer: Partial<Customer>
  status: Status
  taxPercent?: number
  additionalTaxAmount?: Price
  postageOptions?: Postage[]
  selectedPostageOption?: Postage
  postageLabelUrl?: string
  savePaymentInfo?: boolean
  shipmentId?: string
  paymentData?: OrderData
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
