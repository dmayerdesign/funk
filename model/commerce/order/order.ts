import { Discount } from '@funk/model/commerce/discount/discount'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Price } from '@funk/model/commerce/price/price'
import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'

export const ORDERS = 'commerce.orders'

export enum Status {
  CART = 'Cart',
  CART_CHECKOUT = 'Cart checkout',
  PAYMENT_PENDING = 'Payment pending',
  PAID = 'Paid',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  CANCELLED_REFUNDED = 'Refunded due to cancellation',
  RETURNED = 'Returned',
  RETURNED_REFUNDED = 'Refunded upon return',
}

interface BaseOrder extends DatabaseDocument {
  status: Status
  customer: Partial<Customer>
  // Tax.
  taxPercent?: number
  additionalTaxAmount?: Price
  // Payment.
  paymentIntentId?: string
  idempotencyKey?: string
  savePaymentInfo?: boolean
  // Shipment.
  shipmentId?: string
  shipmentTrackingCode?: string
  shipmentCarrier?: string
  /** The actual price of the shipment associated with this Order. */
  shipmentPrice?: Price
  /** The "shipping cost" shown to the customer at checkout. */
  shippingCostCharged?: Price
}

export interface PopulatedOrder extends BaseOrder {
  skus: Sku[]
  discounts?: Discount[]
}

export interface MarshalledOrder extends BaseOrder
{
  skus: PrimaryKey[]
  discounts?: PrimaryKey[]
}

export type Order = PopulatedOrder | MarshalledOrder

export type Cart = Order & {
  status: Status.CART | Status.CART_CHECKOUT
}
