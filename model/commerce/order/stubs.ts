import { createFakeAddress } from "@funk/model/address/stubs"
import { MarshalledOrder, Status } from "@funk/model/commerce/order/order"
import { NULL_PRICE } from "@funk/model/commerce/price/price"
import { merge } from "lodash"

export function createFakeMarshalledOrder(
  id = "order-id",
  customProps: Partial<MarshalledOrder> = {}
): MarshalledOrder
{
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
      shippingCostCharged: NULL_PRICE,
      skuQuantityMap: {},
    },
    customProps
  )
}
