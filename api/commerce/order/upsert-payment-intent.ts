import getTaxImpl from "@funk/api/commerce/order/get-tax"
import getTotalBeforeTaxAndShippingImpl from "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import populateImpl from "@funk/api/commerce/order/populate"
import {
  construct as constructCreatePaymentIntentImpl, Options as CreatePaymentIntentOptions
} from "@funk/api/plugins/payment/behaviors/create-payment-intent"
import {
  construct as constructUpdatePaymentIntentImpl, Options as UpdatePaymentIntentOptions
} from "@funk/api/plugins/payment/behaviors/update-payment-intent"
import { MIN_TRANSACTION_CENTS } from "@funk/api/plugins/payment/config"
import updateByIdImpl from "@funk/api/plugins/persistence/behaviors/update-by-id"
import getSecretImpl from "@funk/api/plugins/secrets/behaviors/get-secret"
import onlyKeysImpl from "@funk/functions/helpers/listen/only-keys"
import { MarshalledOrder, Order, ORDERS } from "@funk/model/commerce/order/order"
import { Price } from "@funk/model/commerce/price/price"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"
import add from "@funk/model/money/behaviors/add"
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"

export function construct(
  constructCreatePaymentIntent = constructCreatePaymentIntentImpl,
  constructUpdatePaymentIntent = constructUpdatePaymentIntentImpl,
  getTotalBeforeTaxAndShipping = getTotalBeforeTaxAndShippingImpl,
  getTax = getTaxImpl,
  getSecret = getSecretImpl,
  populate = populateImpl,
  onlyKeys = onlyKeysImpl,
  updateById = updateByIdImpl
)
{
  const _constructCreatePaymentIntent = async () =>
    constructCreatePaymentIntent(
      (await getSecret(PAYMENT_SERVICE_PROVIDER_SECRET_KEY))!
    )
  const _constructUpdatePaymentIntent = async () =>
    constructUpdatePaymentIntent(
      (await getSecret(PAYMENT_SERVICE_PROVIDER_SECRET_KEY))!
    )

  const keysToListenTo: (keyof MarshalledOrder)[] = [
    "skuQuantityMap",
    "taxPercent",
    "shipmentPrice",
    "customer",
    "discounts",
    "status",
  ]

  return onlyKeys<MarshalledOrder>(keysToListenTo, async ({ after }) =>
  {
    const order = after.data() as MarshalledOrder
    const priceAfterTax = await getTransactionPriceAfterTaxOrThrow(await populate(order))
    const paymentIntentData = {
      price: priceAfterTax,
      customerId: order.customer?.idForPayment,
      savePaymentMethod: !!order.customer?.savePaymentInfo,
    } as CreatePaymentIntentOptions & UpdatePaymentIntentOptions

    if (!order.paymentIntentId)
    {
      const createPaymentIntent = await _constructCreatePaymentIntent()
      const paymentIntent = await createPaymentIntent(paymentIntentData)
      await setPaymentIntentId(order.id, paymentIntent.id)
    }
    else
    {
      const updatePaymentIntent = await _constructUpdatePaymentIntent()
      await updatePaymentIntent(order.paymentIntentId, paymentIntentData)
    }
  })

  async function setPaymentIntentId(
    orderId: string,
    paymentIntentId: string
  ): Promise<void>
  {
    if (!orderId || !paymentIntentId) return
    await updateById<MarshalledOrder>(ORDERS, orderId, { paymentIntentId })
  }

  async function getTransactionPriceAfterTaxOrThrow(order: Order): Promise<Price>
  {
    const priceAfterTax = add(
      await getTotalBeforeTaxAndShipping(order),
      await getTax(order))
    if (priceAfterTax.amount < MIN_TRANSACTION_CENTS)
    {
      throw new InvalidInputError(
        "The price after tax did not meet the minimum amount for a transaction.")
    }
    return priceAfterTax
  }
}

export default construct()

export type HandleWrite = ReturnType<typeof construct>
