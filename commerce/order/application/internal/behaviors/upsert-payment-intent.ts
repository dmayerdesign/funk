import getTaxImpl from "@funk/commerce/order/application/internal/behaviors/get-sales-tax"
import getTotalBeforeTaxAndShippingImpl from "@funk/commerce/order/application/internal/behaviors/get-total-before-tax-and-shipping"
import populateImpl from "@funk/commerce/order/application/internal/behaviors/populate"
import {
  MarshalledOrder,
  Order,
  ORDERS,
  Status,
} from "@funk/commerce/order/domain/order"
import { Price } from "@funk/commerce/price/domain/price"
import { InvalidInputError } from "@funk/error/domain/invalid-input-error"
import onlyKeysImpl from "@funk/http/plugins/internal/cloud-function/behaviors/listen/only-keys"
import add from "@funk/money/domain/behaviors/add"
import createPaymentIntentImpl, {
  Options as CreatePaymentIntentOptions,
} from "@funk/money/plugins/internal/payment/behaviors/create-payment-intent"
import updatePaymentIntentImpl, {
  Options as UpdatePaymentIntentOptions,
} from "@funk/money/plugins/internal/payment/behaviors/update-payment-intent"
import { MIN_TRANSACTION_CENTS } from "@funk/money/plugins/internal/payment/configuration"
import updateByIdImpl from "@funk/persistence/application/internal/behaviors/update-by-id"

export function construct(
  createPaymentIntent: typeof createPaymentIntentImpl,
  updatePaymentIntent: typeof updatePaymentIntentImpl,
  getTotalBeforeTaxAndShipping: typeof getTotalBeforeTaxAndShippingImpl,
  getTax: typeof getTaxImpl,
  populate: typeof populateImpl,
  onlyKeys: typeof onlyKeysImpl,
  updateById: typeof updateByIdImpl,
) {
  const keysToListenTo: (keyof MarshalledOrder)[] = [
    "skuQuantityMap",
    "taxPercent",
    "shipmentPrice",
    "customer",
    "discounts",
    "status",
  ]

  return onlyKeys<MarshalledOrder>(keysToListenTo, async ({ after }) => {
    const order = after.data() as MarshalledOrder

    try {
      const priceAfterTax = await getTransactionPriceAfterTaxOrThrow(
        await populate(order),
      )
      const paymentIntentData = {
        price: priceAfterTax,
        customerId: order.customer?.idForPayment,
        savePaymentMethod: !!order.customer?.savePaymentInfo,
      } as CreatePaymentIntentOptions & UpdatePaymentIntentOptions

      if (!order.paymentIntentId) {
        const paymentIntent = await createPaymentIntent(paymentIntentData)
        await setPaymentIntentId(order.id, paymentIntent.id)
      } else {
        await updatePaymentIntent(order.paymentIntentId, paymentIntentData)
      }
    } catch (error) {
      if (error instanceof OrderPriceLessThanMinimumError) {
        if (
          order.status === Status.CART_CHECKOUT ||
          order.status === Status.PAYMENT_PENDING
        ) {
          throw error
        }
      } else {
        throw error
      }
    }
  })

  async function setPaymentIntentId(
    orderId: string,
    paymentIntentId: string,
  ): Promise<void> {
    if (!orderId || !paymentIntentId) return
    await updateById<MarshalledOrder>(ORDERS, orderId, { paymentIntentId })
  }

  async function getTransactionPriceAfterTaxOrThrow(
    order: Order,
  ): Promise<Price> {
    const priceAfterTax = add(
      await getTotalBeforeTaxAndShipping(order),
      await getTax(order),
    )
    if (priceAfterTax.amount < MIN_TRANSACTION_CENTS) {
      throw new OrderPriceLessThanMinimumError(
        "The price after tax did not meet the minimum amount for a transaction.",
      )
    }
    return priceAfterTax
  }
}

export default construct(
  createPaymentIntentImpl,
  updatePaymentIntentImpl,
  getTotalBeforeTaxAndShippingImpl,
  getTaxImpl,
  populateImpl,
  onlyKeysImpl,
  updateByIdImpl,
)

export type HandleWrite = ReturnType<typeof construct>

class OrderPriceLessThanMinimumError extends InvalidInputError {}
