import createOrderForCustomer from "@funk/model/commerce/order/actions/create-order-for-customer"
import { ORDERS } from "@funk/model/commerce/order/order"
import { UserRecord } from "@funk/plugins/auth/user-record"
import setByIdImpl from "@funk/plugins/persistence/actions/set-by-id"

export const construct = ({
  setById = setByIdImpl,
} = {}) =>
  async function(user: UserRecord): Promise<any>
  {
    const newOrder = createOrderForCustomer({
      userId: user.uid,
    })
    await setById(ORDERS, newOrder.id, newOrder)
  }

export default construct()
