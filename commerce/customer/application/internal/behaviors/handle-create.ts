import { UserRecord } from "@funk/auth/plugins/internal/user-record"
import createOrderForCustomer from "@funk/commerce/order/domain/behaviors/create-order-for-customer"
import { ORDERS } from "@funk/commerce/order/domain/order"
import setByIdImpl from "@funk/persistence/application/internal/behaviors/set-by-id"

export function construct(setById: typeof setByIdImpl) {
  return async function (user: UserRecord): Promise<any> {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await setById(ORDERS, newOrder.id, newOrder)
  }
}

export default construct(setByIdImpl)

export type HandleCreate = ReturnType<typeof construct>
