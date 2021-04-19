import getTaxImpl, {
  GetTax,
} from "@funk/commerce/order/application/internal/behaviors/get-sales-tax"
import getTotalBeforeTaxAndShippingImpl, {
  GetTotalBeforeTaxAndShipping,
} from "@funk/commerce/order/application/internal/behaviors/get-total-before-tax-and-shipping"
import populateImpl, {
  Populate,
} from "@funk/commerce/order/application/internal/behaviors/persistence/populate"
import { Order } from "@funk/commerce/order/model/order"
import { Price } from "@funk/commerce/price/model/price"
import { InvalidInputError } from "@funk/error/model/invalid-input-error"
import onlyKeysImpl, {
  OnlyKeys,
} from "@funk/http/plugins/internal/cloud-function/behaviors/listen/only-keys"
import add from "@funk/money/model/behaviors/add"
import createPaymentIntentImpl, {
  CreatePaymentIntent,
  Options as CreatePaymentIntentOptions,
} from "@funk/money/plugins/internal/payment/behaviors/create-payment-intent"
import updatePaymentIntentImpl, {
  Options as UpdatePaymentIntentOptions,
  UpdatePaymentIntent,
} from "@funk/money/plugins/internal/payment/behaviors/update-payment-intent"
import { MIN_TRANSACTION_CENTS } from "@funk/money/plugins/internal/payment/configuration"
import updateOrderByIdImpl, {
  UpdateById as UpdateOrderById,
} from "./persistence/update-by-id"

export function construct(
  createPaymentIntent: CreatePaymentIntent,
  updatePaymentIntent: UpdatePaymentIntent,
  getTotalBeforeTaxAndShipping: GetTotalBeforeTaxAndShipping,
  getTax: GetTax,
  populate: Populate,
  onlyKeys: OnlyKeys,
  updateOrderById: UpdateOrderById,
) {
  const keysToListenTo: (keyof Order)[] = [
    "skuQuantityMap",
    "taxPercent",
    "shipmentPrice",
    "customer",
    "discounts",
    "status",
  ]

  return onlyKeys<Order>(keysToListenTo, async ({ after }) => {
    const order = await populate(after.data() as Order)

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
  })

  async function setPaymentIntentId(
    orderId: string,
    paymentIntentId: string,
  ): Promise<void> {
    await updateOrderById(orderId, { paymentIntentId })
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
  updateOrderByIdImpl,
)

export type HandleWrite = ReturnType<typeof construct>

class OrderPriceLessThanMinimumError extends InvalidInputError {}
