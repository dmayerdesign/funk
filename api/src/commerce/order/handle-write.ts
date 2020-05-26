import getSecretImpl from "@funk/api/admin/get-secret"
import populateImpl from "@funk/api/commerce/order/populate"
import getProductForSkuImpl from "@funk/api/commerce/product/get-product-for-sku"
import ignoringKeysImpl from "@funk/functions/helpers/listen/ignoring-keys"
import { construct as constructGetTaxImpl } from "@funk/model/commerce/order/actions/get-tax"
import { construct as constructGetTotalBeforeTaxImpl } from
  "@funk/model/commerce/order/actions/get-total-before-tax-and-shipping"
import { MarshalledOrder, Order, ORDERS } from "@funk/model/commerce/order/order"
import add from "@funk/model/commerce/price/actions/add"
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from "@funk/model/secret/keys"
import {
  construct as constructCreatePaymentIntentImpl,
  Options as CreatePaymentIntentOptions,
} from "@funk/plugins/payment/actions/create-payment-intent"
import {
  construct as constructUpdatePaymentIntentImpl,
  Options as UpdatePaymentIntentOptions,
} from "@funk/plugins/payment/actions/update-payment-intent"
import updateByIdImpl from "@funk/plugins/persistence/actions/update-by-id"
import { Price } from "@funk/model/commerce/price/price"
import { MIN_TRANSACTION_CENTS } from "@funk/plugins/payment/config"

export const construct = ({
  constructGetTotalBeforeTax = constructGetTotalBeforeTaxImpl,
  constructGetTax = constructGetTaxImpl,
  getSecret = getSecretImpl,
  populate = populateImpl,
  getProductForSku = getProductForSkuImpl,
  ignoringKeys = ignoringKeysImpl,
  constructCreatePaymentIntent = constructCreatePaymentIntentImpl,
  constructUpdatePaymentIntent = constructUpdatePaymentIntentImpl,
  updateById = updateByIdImpl,
} = {}) =>
{
  const _getTotalBeforeTax = constructGetTotalBeforeTax({ getProductForSku })
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
    const populatedOrder = await populate(order)
    let priceAfterTax: Price
    try
    {
      priceAfterTax = add(
        await _getTotalBeforeTax(populatedOrder),
        await _getTax(populatedOrder))
      if (priceAfterTax.amount < MIN_TRANSACTION_CENTS)
      {
        return
      }
    }
    catch (error)
    {
      return
    }
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
}

export default construct()
