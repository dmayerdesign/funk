import createOrderForCustomer from "@funk/model/commerce/order/actions/create-order-for-customer"
import { ORDERS } from "@funk/model/commerce/order/order"
import { UserRecord } from "@funk/api/plugins/auth/user-record"
import setByIdImpl from "@funk/api/plugins/persistence/actions/set-by-id"

export function construct(
  setById = setByIdImpl
)
{
  return async function(user: UserRecord): Promise<any>
  {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await setById(ORDERS, newOrder.id, newOrder)
  }
}

export default construct()

export type HandleCreate = ReturnType<typeof construct>