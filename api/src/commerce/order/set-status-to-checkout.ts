import { PrimaryKey } from "@funk/model/data-access/primary-key"
import updateByIdImpl from "@funk/plugins/persistence/actions/update-by-id"
import { Cart, ORDERS, Status } from "@funk/model/commerce/order/order"

export function construct({
  updateById = updateByIdImpl,
} = {})
{
  return async function(cartId: PrimaryKey): Promise<void>
  {
    await updateById<Cart>(ORDERS, cartId, { status: Status.CART_CHECKOUT })
  }
}

export default construct()
