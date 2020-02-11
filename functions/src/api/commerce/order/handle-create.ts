import getSecret from '@funk/functions/helpers/admin/get-secret'
import populate from '@funk/functions/helpers/commerce/order/populate'
import createWriteHandler from '@funk/functions/helpers/listen/create-write-handler'
import createUid from '@funk/helpers/create-uid'
import loudlyLog from '@funk/helpers/loudly-log'
import getTotalBeforeTax from '@funk/model/commerce/order/actions/get-total-before-tax'
import { MarshalledOrder, Order, ORDERS } from '@funk/model/commerce/order/order'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import { store } from '@funk/plugins/db/store'
import upsertPaymentIntent, { CreateInput } from '@funk/plugins/payment/actions/upsert-payment-intent'
import { OrderData } from '@funk/plugins/payment/order-data'

export default createWriteHandler(
  ORDERS,
  async ({ after }, { params }) =>
  {
    try
    {
      const marshalledOrder = after.data() as MarshalledOrder
      let orderUpdate = {} as Order
      const existingIdempotencyKey = marshalledOrder.idempotencyKey
      const idempotencyKey = existingIdempotencyKey || createUid()
      const paymentIntentId = marshalledOrder.paymentData
        && marshalledOrder.paymentData.paymentIntentId

      if (!existingIdempotencyKey)
      {
        orderUpdate = { idempotencyKey } as Order
      }

      if (!paymentIntentId)
      {
        const order = await populate(marshalledOrder)
        const price = await getTotalBeforeTax({
          order,
          getProductForSku: (sku) => store().collection(PRODUCTS)
            .where('id', '==', sku.productId)
            .get()
            .then((_snapshot) => _snapshot.docs[0].data() as Product),
        })

        if (price.amount)
        {
          loudlyLog('creating a payment intent...', ORDERS, params.id, idempotencyKey)
          const { paymentIntent } = await upsertPaymentIntent({
            paymentSecretKey: await getSecret({ secretKey: PAYMENT_SERVICE_PROVIDER_SECRET_KEY }),
            // TODO: Use geolocation data if present to add sales tax.
            price,
            savePaymentMethod: false,
            customerId: order.customer && order.customer.idForPayment,
            idempotencyKey,
          } as CreateInput)
          const paymentIntentIdUpdatePath: [keyof Order, keyof OrderData] = [
            'paymentData',
            'paymentIntentId',
          ]
          orderUpdate = {
            ...orderUpdate,
            [paymentIntentIdUpdatePath.join('.')]: paymentIntent.id,
          }
          loudlyLog('created a payment intent', paymentIntent, ORDERS, params.id, idempotencyKey)
        }
      }

      if (Object.keys(orderUpdate).length)
      {
        await store().collection(ORDERS)
          .doc(params.id)
          .update(orderUpdate)
      }
    }
    catch (error)
    {
      console.log(error)
    }
  }
)
