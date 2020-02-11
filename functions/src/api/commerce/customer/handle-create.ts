import createOrderForCustomer from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { authEvents } from '@funk/plugins/auth/auth-events'
import { store } from '@funk/plugins/db/store'

export default authEvents().user().onCreate(async function(user): Promise<any>
{
  if (user.email)
  {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await store().collection(ORDERS).doc(newOrder.id).set(newOrder)
  }
})
