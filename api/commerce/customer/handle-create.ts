import createOrderForCustomer from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { UserRecord } from '@funk/plugins/auth/user-record'
import { store } from '@funk/plugins/persistence/server-store'

export default async function(user: UserRecord): Promise<any>
{
  if (user.email)
  {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await store().collection(ORDERS).doc(newOrder.id).set(newOrder)
  }
}
