import createCreateHandler from '@funk/functions/helpers/listen/create-create-handler'
import createUid from '@funk/helpers/create-uid'
import { MarshalledOrder, ORDERS } from '@funk/model/commerce/order/order'
import { store } from '@funk/plugins/db/store'

export default createCreateHandler(
  ORDERS,
  async (snapshot) =>
  {
    const order = snapshot.data() as MarshalledOrder
    await _setNewIdempotencyKey(order.id)
  }
)

async function _setNewIdempotencyKey(
  orderId: string,
): Promise<void>
{
  await store().collection(ORDERS)
    .doc(orderId)
    .update({
      idempotencyKey: createUid(),
    } as Partial<MarshalledOrder>)
}
