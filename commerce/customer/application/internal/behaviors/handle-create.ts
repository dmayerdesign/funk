import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import setOrderByIdImpl from "@funk/commerce/order/application/internal/behaviors/persistence/set-by-id"
import createOrderForCustomer from "@funk/commerce/order/model/behaviors/create-order-for-customer"

export function construct(setOrderById: typeof setOrderByIdImpl) {
  return async function (user: UserRecord): Promise<any> {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await setOrderById(newOrder.id, newOrder)
  }
}

export default construct(setOrderByIdImpl)

export type HandleCreate = ReturnType<typeof construct>
