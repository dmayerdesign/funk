import getByIdImpl from "@funk/commerce/order/application/internal/behaviors/persistence/get-by-id"
import updateByIdImpl from "@funk/commerce/order/application/internal/behaviors/persistence/update-by-id"
import setSkuQuantity from "@funk/commerce/order/model/behaviors/set-sku-quantity"
import getSkuByIdImpl from "@funk/commerce/sku/application/internal/behaviors/persistence/get-by-id"
import { NotFoundError } from "@funk/error/model/not-found-error"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

interface Options {
  orderId: PrimaryKey
  skuId: PrimaryKey
  quantity: number
}

export function construct(
  getById: typeof getByIdImpl,
  updateById: typeof updateByIdImpl,
  getSkuById: typeof getSkuByIdImpl,
) {
  return async function ({ orderId, skuId, quantity }: Options): Promise<void> {
    const order = await getById(orderId)
    const sku = await getSkuById(skuId)

    if (sku && !order) {
      throw new NotFoundError(`The order ${orderId} could not be found.`)
    }
    if (order && !sku) {
      throw new NotFoundError(`The sku ${skuId} could not be found.`)
    }
    if (!sku && !order) {
      throw new NotFoundError(
        `The order ${orderId} could not be found; the sku ${skuId} could not be found.`,
      )
    }
    const updatedOrder = setSkuQuantity(order!, { sku: sku!, quantity })
    await updateById(orderId, updatedOrder)
  }
}

export default construct(getByIdImpl, updateByIdImpl, getSkuByIdImpl)

export type SetSkuQuantity = ReturnType<typeof construct>
