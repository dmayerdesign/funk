import getByIdImpl from "@funk/api/plugins/persistence/behaviors/get-by-id"
import updateByIdImpl from "@funk/api/plugins/persistence/behaviors/update-by-id"
import setMarshalledSkuQuantity from "@funk/model/commerce/order/behaviors/set-marshalled-sku-quantity"
import { MarshalledOrder, ORDERS } from "@funk/model/commerce/order/order"
import { PrimaryKey } from "@funk/model/data-access/primary-key"

export function construct(
  getById: typeof getByIdImpl,
  updateById: typeof updateByIdImpl
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

export default construct(
  getByIdImpl,
  updateByIdImpl
)

export type SetSkuQuantity = ReturnType<typeof construct>
