import { PrimaryKey } from "@funk/model/data-access/primary-key"
import setByIdImpl from "@funk/plugins/persistence/actions/set-by-id"
import { Cart, ORDERS, Status } from "@funk/model/commerce/order/order"

export const construct = ({
  setById = setByIdImpl,
} = {}) =>
  async function(cartId: PrimaryKey): Promise<void>
  {
    await setById<Cart>(ORDERS, cartId, { status: Status.CART_CHECKOUT })
  }

export default construct()
