import getSecret from '@funk/functions/helpers/admin/get-secret'
import populate from '@funk/functions/helpers/commerce/order/populate'
import getProductForSku from '@funk/functions/helpers/commerce/product/get-product-for-sku'
import createWriteHandler from '@funk/functions/helpers/listen/create-write-handler'
import createUid from '@funk/helpers/create-uid'
import loudlyLog from '@funk/helpers/loudly-log'
import getTotalBeforeTax from '@funk/model/commerce/order/actions/get-total-before-tax'
import { MarshalledOrder, Order, ORDERS } from '@funk/model/commerce/order/order'
import { PAYMENT_SERVICE_PROVIDER_SECRET_KEY } from '@funk/model/secret/keys'
import { store } from '@funk/plugins/db/store'
import upsertPaymentIntent, { CreateInput } from '@funk/plugins/payment/actions/upsert-payment-intent'

export default createWriteHandler(
  ORDERS,
  async ({ after }, { params }) =>
  {
    try
    {
      const marshalledOrder = after.data() as MarshalledOrder
      const existingPaymentIntentId = marshalledOrder.paymentData?.paymentIntentId
      const existingIdempotencyKey = marshalledOrder.idempotencyKey
      const orderUpdater = new OrderUpdater(params.id)

      if (!existingPaymentIntentId
        && !existingIdempotencyKey)
      {
        await _upsertPaymentIntentIfOrderHasPrice(marshalledOrder, orderUpdater)
      }
    }
    catch (error)
    {
      console.log(error)
    }
  }
)

class OrderUpdater {
  private _orderUpdate: Partial<Order> = {}

  constructor(private _orderId: string)
  { }

  public setIdempotencyKey(idempotencyKey: string): this
  {
    this._orderUpdate = {
      ...this._orderUpdate,
      idempotencyKey,
    }
    return this
  }

  public setPaymentIntentId(paymentIntentId: string): this
  {
    this._orderUpdate = {
      ...this._orderUpdate,
      paymentData: {
        ...this._orderUpdate.paymentData,
        paymentIntentId,
      },
    }
    return this
  }

  public async update(): Promise<void>
  {
    if (!!this._orderId
      && Object.keys(this._orderUpdate).length)
    {
      await store().collection(ORDERS)
        .doc(this._orderId)
        .update(this._orderUpdate)
    }
  }
}

async function _upsertPaymentIntentIfOrderHasPrice(
  marshalledOrder: MarshalledOrder,
  orderUpdater: OrderUpdater,
): Promise<{ id: string } | undefined>
{
  const idempotencyKey = createUid()
  const order = await populate(marshalledOrder)
  const price = await getTotalBeforeTax({ order, getProductForSku })

  if (price.amount)
  {
    loudlyLog('creating a payment intent...', order.id, idempotencyKey)
    const { paymentIntent } = await upsertPaymentIntent({
      paymentSecretKey: await getSecret({ secretKey: PAYMENT_SERVICE_PROVIDER_SECRET_KEY }),
      // TODO: Use geolocation data if present to add sales tax.
      price,
      savePaymentMethod: false,
      customerId: order.customer && order.customer.idForPayment,
      idempotencyKey,
    } as CreateInput)

    await orderUpdater
      .setPaymentIntentId(paymentIntent.id)
      .setIdempotencyKey(idempotencyKey)
      .update()
    loudlyLog('created a payment intent', paymentIntent)

    return paymentIntent
  }
}
