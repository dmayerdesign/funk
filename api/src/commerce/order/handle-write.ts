import getSecretImpl from "@funk/api/admin/get-secret"
import populateImpl from "@funk/api/commerce/order/populate"
import getProductForSkuImpl from "@funk/api/commerce/product/get-product-for-sku"
import ignoringKeysImpl from "@funk/functions/helpers/listen/ignoring-keys"
import { construct as constructGetTaxImpl } from "@funk/model/commerce/order/actions/get-tax"
import { construct as constructGetTotalBeforeTaxAndShippingImpl } from
  "@funk/model/commerce/order/actions/get-total-before-tax-and-shipping"
import { MarshalledOrder, ORDERS, Order, PopulatedOrder } from "@funk/model/commerce/order/order"
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

export function construct({
  constructGetTotalBeforeTaxAndShipping = constructGetTotalBeforeTaxAndShippingImpl,
  constructGetTax = constructGetTaxImpl,
  getSecret = getSecretImpl,
  populate = populateImpl,
  getProductForSku = getProductForSkuImpl,
  ignoringKeys = ignoringKeysImpl,
  constructCreatePaymentIntent = constructCreatePaymentIntentImpl,
  constructUpdatePaymentIntent = constructUpdatePaymentIntentImpl,
  updateById = updateByIdImpl,
} = {})
{
  const _getTotalBeforeTaxAndShipping = constructGetTotalBeforeTaxAndShipping({ getProductForSku })
  const _getTax = constructGetTax({ getProductForSku })
  const _constructCreatePaymentIntent = async () =>
    constructCreatePaymentIntent({
      paymentProviderSecret: (await getSecret(PAYMENT_SERVICE_PROVIDER_SECRET_KEY))!,
    })
  const _constructUpdatePaymentIntent = async () =>
    constructUpdatePaymentIntent({
      paymentProviderSecret: (await getSecret(PAYMENT_SERVICE_PROVIDER_SECRET_KEY))!,
    })

  return ignoringKeys<Order>([ "paymentIntentId" ], async ({ after }) =>
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

  async function getTransactionPriceAfterTaxOrThrow(order: PopulatedOrder): Promise<Price>
  {
    const priceAfterTax = add(
      await _getTotalBeforeTaxAndShipping(order),
      await _getTax(order))
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
