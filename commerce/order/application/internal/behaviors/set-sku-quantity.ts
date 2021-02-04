import setMarshalledSkuQuantity from "@funk/commerce/order/model/behaviors/set-marshalled-sku-quantity"
import { MarshalledOrder, ORDERS } from "@funk/commerce/order/model/order"
import type getByIdImpl from "@funk/persistence/application/internal/behaviors/get-by-id"
import type updateByIdImpl from "@funk/persistence/application/internal/behaviors/update-by-id"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(
  getById: typeof getByIdImpl,
  updateById: typeof updateByIdImpl,
) {
  interface Options {
    orderId: PrimaryKey
    skuId: PrimaryKey
    quantity: number
  }

  return async function ({ orderId, skuId, quantity }: Options): Promise<void> {
    const order = await getById<MarshalledOrder>(ORDERS, orderId)
    const updatedOrder = setMarshalledSkuQuantity(order!, { skuId, quantity })
    await updateById(ORDERS, orderId, updatedOrder)
  }
}

// export default construct(getByIdImpl, updateByIdImpl)

export type SetSkuQuantity = ReturnType<typeof construct>
