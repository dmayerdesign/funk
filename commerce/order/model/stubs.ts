import {
    MarshalledCart,
    MarshalledOrder,
    Order,
    Status
} from "@funk/commerce/order/model/order"
import { NULL_PRICE } from "@funk/commerce/price/model/price"
import { createFakeAddress } from "@funk/places/model/stubs"
import { merge } from "lodash"

export function createFakeMarshalledOrder(
  id = "order-id",
  customProps: Partial<MarshalledOrder> = {},
): MarshalledOrder {
  return merge<MarshalledOrder, Partial<MarshalledOrder>>(
    {
      id,
      status: Status.PAYMENT_PENDING,
      customer: {
        userId: "fake-user-id",
        idForPayment: "fake-user-id-for-payment",
        email: "fake email",
        firstName: "fake firstName",
        lastName: "fake lastName",
        shippingAddress: createFakeAddress(),
        billingAddress: createFakeAddress(),
        savePaymentInfo: false,
      },
      // Tax.
      taxPercent: 10,
      additionalTaxAmount: NULL_PRICE,
      // Payment.
      paymentIntentId: "fake paymentIntentId",
      idempotencyKey: "fake idempotencyKey",
      // Shipment.
      shipmentId: "fake shipmentId",
      shipmentTrackingCode: "fake shipmentTrackingCode",
      shipmentCarrier: "fake shipmentCarrier",
      /** The actual price of the shipment associated with this Order. */
      shipmentPrice: NULL_PRICE,
      /** The "shipping cost" shown to the customer at checkout. */
      shipmentPriceDisplayed: NULL_PRICE,
      skuQuantityMap: {},
      skus: [],
      discounts: [],
    },
    customProps,
  )
}

export function createFakeMarshalledCart(
  id = "order-id",
  customProps: Partial<MarshalledCart> = {},
): MarshalledCart {
  return createFakeMarshalledOrder(id, {
    status: Status.PAYMENT_PENDING,
    ...customProps,
  }) as MarshalledCart
}

export function createFakeOrder(
  id = "order-id",
  customProps: Partial<Order> = {},
): Order {
  return merge<Order, Partial<Order>>(
    createFakeMarshalledOrder(id) as Order,
    customProps,
  )
}
