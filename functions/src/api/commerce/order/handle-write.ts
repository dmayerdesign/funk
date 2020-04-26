import getSecret from '@funk/functions/helpers/admin/get-secret'
import populate from '@funk/functions/helpers/commerce/order/populate'
import getProductForSku from '@funk/functions/helpers/commerce/product/get-product-for-sku'
import createWriteHandler from '@funk/functions/helpers/listen/create-write-handler'
import ignoringKey from '@funk/functions/helpers/listen/ignoring-key'
import { construct as constructGetTax } from '@funk/model/commerce/order/actions/get-tax'
import { construct as constructGetTotalBeforeTax } from
  '@funk/model/commerce/order/actions/get-total-before-tax-and-shipping'
import { MarshalledOrder, Order, ORDERS } from '@funk/model/commerce/order/order'
import add from '@funk/model/commerce/price/actions/add'
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import { store } from '@funk/plugins/db/store'
import {
  construct as constructCreatePaymentIntent,
  Options as CreatePaymentIntentOptions,
} from '@funk/plugins/payment/actions/create-payment-intent'
import {
  construct as constructUpdatePaymentIntent,
  Options as UpdatePaymentIntentOptions,
} from '@funk/plugins/payment/actions/update-payment-intent'

export default createWriteHandler(
  ORDERS,
  ignoringKey<Order>('paymentIntentId', async ({ after }) =>
  {
    const order = after.data() as MarshalledOrder
    const populatedOrder = await populate(order)
    const priceAfterTax = add(
      await _getTotalBeforeTax(populatedOrder),
      await _getTax(populatedOrder))
    const paymentIntentData = {
      price: priceAfterTax,
      customerId: order.customer?.idForPayment,
      savePaymentMethod: !!order.savePaymentInfo,
    } as CreatePaymentIntentOptions & UpdatePaymentIntentOptions

    if (!order.paymentIntentId)
    {
      const createPaymentIntent = await _newCreatePaymentIntent()
      const paymentIntent = await createPaymentIntent(paymentIntentData)
      await _setPaymentIntentId(order.id, paymentIntent.id)
    }
    else
    {
      const updatePaymentIntent = await _newUpdatePaymentIntent()
      await updatePaymentIntent(order.paymentIntentId, paymentIntentData)
    }
  })
)

const _getTotalBeforeTax = constructGetTotalBeforeTax({ getProductForSku })
const _getTax = constructGetTax({ getProductForSku })
const _newCreatePaymentIntent = async () =>
{
  return constructCreatePaymentIntent({
    paymentSecretKey: await getSecret({
      secretKey: PAYMENT_SERVICE_PROVIDER_SECRET_KEY }) as string,
  })
}
const _newUpdatePaymentIntent = async () =>
{
  return constructUpdatePaymentIntent({
    paymentSecretKey: await getSecret({
      secretKey: PAYMENT_SERVICE_PROVIDER_SECRET_KEY }) as string,
  })
}

async function _setPaymentIntentId(
  orderId: string,
  paymentIntentId: string,
): Promise<void>
{
  if (!orderId || !paymentIntentId) return
  await store().collection(ORDERS)
    .doc(orderId)
    .update({ paymentIntentId } as Partial<MarshalledOrder>)
}
