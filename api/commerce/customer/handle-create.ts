import { UserRecord } from "@funk/api/plugins/auth/user-record"
import setByIdImpl from "@funk/api/plugins/persistence/behaviors/set-by-id"
import createOrderForCustomer from "@funk/model/commerce/order/behaviors/create-order-for-customer"
import { ORDERS } from "@funk/model/commerce/order/order"

export function construct(
  setById: typeof setByIdImpl
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

export default construct(setByIdImpl)

export type HandleCreate = ReturnType<typeof construct>
