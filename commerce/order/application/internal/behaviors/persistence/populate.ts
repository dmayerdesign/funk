import { DISCOUNTS } from "@funk/commerce/discount/model/discount"
import { Order } from "@funk/commerce/order/model/order"
import { SKUS } from "@funk/commerce/sku/model/sku"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"

export function construct(populate: typeof genericPopulate) {
  return function (order: Marshalled<Order> | undefined): Promise<Order> {
    return populate<Order>(order, [
      { key: "skus", collectionPath: SKUS },
      { key: "discounts", collectionPath: DISCOUNTS },
    ])
  }
}

export default construct(genericPopulate)

export type Populate = ReturnType<typeof construct>
