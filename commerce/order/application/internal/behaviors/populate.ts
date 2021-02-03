import { DISCOUNTS } from "@funk/commerce/discount/domain/discount"
import { MarshalledOrder, Order } from "@funk/commerce/order/domain/order"
import { SKUS } from "@funk/commerce/sku/domain/sku"
import populateImpl from "@funk/persistence/application/internal/behaviors/populate"

export function construct(populate: typeof populateImpl) {
  return function (order: MarshalledOrder): Promise<Order> {
    return populate<Order, MarshalledOrder>(order, [
      { key: "skus", collectionPath: SKUS },
      { key: "discounts", collectionPath: DISCOUNTS },
    ])
  }
}

export default construct(populateImpl)

export type Populate = ReturnType<typeof construct>
