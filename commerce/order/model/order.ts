import { Customer } from "@funk/commerce/customer/model/customer"
import { Discount } from "@funk/commerce/discount/model/discount"
import { Price } from "@funk/commerce/price/model/price"
import { MarshalledSku } from "@funk/commerce/sku/model/sku"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export const ORDERS = "commerce.orders"

export enum Status {
  CART = "Cart",
  CART_CHECKOUT = "Cart checkout",
  PAYMENT_PENDING = "Payment pending",
  PAID = "Paid",
  SHIPPED = "Shipped",
  DELIVERED = "Delivered",
  CANCELLED = "Cancelled",
  CANCELLED_REFUNDED = "Refunded due to cancellation",
  RETURNED = "Returned",
  RETURNED_REFUNDED = "Refunded upon return",
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
  // Shipment.
  shipmentId?: string
  shipmentTrackingCode?: string
  shipmentCarrier?: string
  /** The actual price of the shipment associated with this Order. */
  shipmentPrice?: Price
  /** The "shipping cost" shown to the customer at checkout. */
  shipmentPriceDisplayed?: Price
  skuQuantityMap: { [skuId: string]: number }
}

export interface Order extends BaseOrder {
  /** @required */
  skus?: MarshalledSku[]
  discounts?: Discount[]
}
export type Cart = Order & {
  status: Status.CART | Status.CART_CHECKOUT
}

export interface MarshalledOrder extends BaseOrder {
  /** @required */
  skus?: PrimaryKey[]
  discounts?: PrimaryKey[]
}
export type MarshalledCart = MarshalledOrder & {
  status: Status.CART | Status.CART_CHECKOUT
}
