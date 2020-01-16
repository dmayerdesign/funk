import getSecret from '@funk/functions/helpers/admin/get-secret'
import populate from '@funk/functions/helpers/commerce/order/populate'
import createCreateHandler from '@funk/functions/helpers/listen/create-create-handler'
import createUid from '@funk/helpers/create-uid'
import loudlyLog from '@funk/helpers/loudly-log'
import getTotalBeforeTax from '@funk/model/commerce/order/actions/get-total-before-tax'
import { MarshalledOrder, Order, ORDERS } from '@funk/model/commerce/order/order'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import { store } from '@funk/plugins/db/store'
import upsertPaymentIntent, { CreateInput } from '@funk/plugins/payment/actions/upsert-payment-intent'
import { OrderData } from '@funk/plugins/payment/order-data'

/**
 * Given
 *   an order being created early in the funnel, and
 *   that the postal code of the buyer is most likely unknown,
 *
 * when
 *   it is created,
 *
 * then
 *   the app must persist the user's intent to pay, and
 *   it must persist an idempotency key to be used throughout the lifespan of this order.
 */
export default createCreateHandler(ORDERS,
  async (snapshot, { params }) =>
  {
    console.log('===== creating a payment intent... =====')

    const order = await populate(snapshot.data() as MarshalledOrder)
    const idempotencyKey = createUid()

    console.log(ORDERS, params.id, idempotencyKey)

    // Create an initial `PaymentIntent` with whatever data we can gather.
    // TODO: Use geolocation data if present to add sales tax.
    loudlyLog('creating a payment intent...', ORDERS, params.id, idempotencyKey)
    const { paymentIntent } = await upsertPaymentIntent({
      paymentSecretKey: await getSecret({ secretKey: PAYMENT_SERVICE_PROVIDER_SECRET_KEY }),
      price: await getTotalBeforeTax({
          order,
          getProductForSku: (sku) => store().collection(PRODUCTS)
            .where('id', '==', sku.productId)
            .get()
            .then((_snapshot) => _snapshot.docs[0].data() as Product),
        }),
      savePaymentMethod: false,
      customerId: order.customer && order.customer.idForPayment,
      idempotencyKey,
    } as CreateInput)
    loudlyLog('created a payment intent', paymentIntent, ORDERS, params.id, idempotencyKey)

    console.log('===== created a payment intent =====')
    console.log(paymentIntent, ORDERS, params.id, idempotencyKey)

    const paymentIntentIdUpdatePath: [keyof Order, keyof OrderData] = [
      'paymentData',
      'paymentIntentId',
    ]
    await store().collection(ORDERS)
      .doc(params.id)
      .update({
        idempotencyKey,
        [paymentIntentIdUpdatePath.join('.')]: paymentIntent.id,
      })
  }
)
