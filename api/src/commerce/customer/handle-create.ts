import createOrderForCustomer from '@funk/model/commerce/order/actions/create-order-for-customer'
import { ORDERS } from '@funk/model/commerce/order/order'
import { UserRecord } from '@funk/plugins/auth/user-record'
import setById from '@funk/plugins/persistence/actions/set-by-id'

export default async function(user: UserRecord): Promise<any>
{
  if (user.email)
  {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await setById(ORDERS, newOrder.id, newOrder)
  }
}
