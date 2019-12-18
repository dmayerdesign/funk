import getSecret from '@funk/functions/helpers/admin/get-secret'
import populate from '@funk/functions/helpers/commerce/order/populate'
import getTotal from '@funk/model/commerce/order/actions/get-total'
import { MarshalledOrder, Order, ORDERS } from '@funk/model/commerce/order/order'
import { Product, PRODUCTS } from '@funk/model/commerce/product/product'
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import upsertPaymentIntent from '@funk/plugins/stripe/actions/upsert-payment-intent'
import { OrderData } from '@funk/plugins/stripe/order-data'
import { firestore as db } from 'firebase-admin'
import { firestore } from 'firebase-functions'
const uuid = require('uuid/v4')

/**
 * Given an order being created early in the funnel,
 * and that the postal code of the buyer is most likely unknown,
 *
 * when it is created,
 * then the app must persist the user's intent to pay
 * and it must persist an idempotency key to be used throughout the lifespan of this order.
 */
export default firestore.document(`${ORDERS}/{id}`).onCreate(
  async (change, { params }) =>
  {
    const order = await populate(change.data() as MarshalledOrder)
    const idempotencyKey = uuid()

    // Create an initial `PaymentIntent` with whatever data we can gather.
    const { paymentIntent } = await upsertPaymentIntent({
      stripeSecretKey: await getSecret({ secretKey: PAYMENT_SERVICE_PROVIDER_SECRET_KEY }),
      price: await getTotal({
        order,
        taxRate: 0,
        getProduct: (sku) => db().collection(PRODUCTS)
          .where('id', '==', sku.productId)
          .get()
          .then((snapshot) => snapshot.docs[0].data() as Product),
      }),
      savePaymentMethod: false,
      customerId: order.customer && order.customer.idForPaymentServiceProvider,
      idempotencyKey,
    })

    const paymentIntentIdUpdatePath: [keyof Order, keyof OrderData] = [
      'paymentServiceProviderData',
      'paymentIntentId',
    ]
    await db().collection(ORDERS).doc(params.id)
      .update({
        idempotencyKey,
        [paymentIntentIdUpdatePath.join('.')]: paymentIntent.id,
      })
  })
