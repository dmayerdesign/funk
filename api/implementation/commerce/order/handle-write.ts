import getSecretImpl from "@funk/plugins/secrets/actions/get-secret"
import populateImpl from "@funk/api/commerce/order/populate"
import ignoringKeysImpl from "@funk/functions/helpers/listen/ignoring-keys"
import getTaxImpl from "@funk/api/commerce/order/get-tax"
import getTotalBeforeTaxAndShippingImpl from
  "@funk/api/commerce/order/get-total-before-tax-and-shipping"
import { MarshalledOrder, ORDERS, Order } from "@funk/model/commerce/order/order"
import add from "@funk/model/commerce/price/actions/add"
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"
import {
  Options as CreatePaymentIntentOptions,
  construct as constructCreatePaymentIntentImpl,
} from "@funk/plugins/payment/actions/create-payment-intent"
import {
  Options as UpdatePaymentIntentOptions,
  construct as constructUpdatePaymentIntentImpl,
} from "@funk/plugins/payment/actions/update-payment-intent"
import updateByIdImpl from "@funk/plugins/persistence/actions/update-by-id"
import { Price } from "@funk/model/commerce/price/price"
import { MIN_TRANSACTION_CENTS } from "@funk/plugins/payment/config"
import { InvalidInputError } from "@funk/model/error/invalid-input-error"

export function construct(
  constructCreatePaymentIntent = constructCreatePaymentIntentImpl,
  constructUpdatePaymentIntent = constructUpdatePaymentIntentImpl,
  getTotalBeforeTaxAndShipping = getTotalBeforeTaxAndShippingImpl,
  getTax = getTaxImpl,
  getSecret = getSecretImpl,
  populate = populateImpl,
  ignoringKeys = ignoringKeysImpl,
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

  return ignoringKeys<MarshalledOrder>([ "paymentIntentId" ], async ({ after }) =>
  {
    const order = after.data() as MarshalledOrder
    const priceAfterTax = await getTransactionPriceAfterTaxOrThrow(await populate(order))
    const paymentIntentData = {
      price: priceAfterTax,
      customerId: order.customer?.idForPayment,
      savePaymentMethod: !!order.savePaymentInfo,
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
