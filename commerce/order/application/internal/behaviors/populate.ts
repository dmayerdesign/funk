import { DISCOUNTS } from "@funk/commerce/discount/model/discount"
import { MarshalledOrder, Order } from "@funk/commerce/order/model/order"
import { SKUS } from "@funk/commerce/sku/model/sku"
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
