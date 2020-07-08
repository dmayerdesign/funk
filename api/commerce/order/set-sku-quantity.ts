import setMarshalledSkuQuantity from
  "@funk/model/commerce/order/actions/set-marshalled-sku-quantity"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import getByIdImpl from "@funk/api/plugins/persistence/actions/get-by-id"
import updateByIdImpl from "@funk/api/plugins/persistence/actions/update-by-id"
import { PrimaryKey } from "@funk/model/data-access/primary-key"

export function construct(
  getById = getByIdImpl,
  updateById = updateByIdImpl
)
{
  interface Options {
    orderId: PrimaryKey
    skuId: PrimaryKey
    quantity: number
  }

  return async function(
    { orderId, skuId, quantity }: Options
  ): Promise<void>
  {
    const order = await getById<MarshalledOrder>(ORDERS, orderId)
    const updatedOrder = setMarshalledSkuQuantity(order!, { skuId, quantity })
    await updateById(ORDERS, orderId, updatedOrder)
  }
}

export default construct()

export type SetSkuQuantity = ReturnType<typeof construct>
