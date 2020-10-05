import populateImpl from "@funk/api/plugins/persistence/behaviors/populate"
import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { SKUS } from "@funk/model/commerce/sku/sku"

export function construct(populate: typeof populateImpl)
{
  return function(order: MarshalledOrder): Promise<Order>
  {
    return populate<Order, MarshalledOrder>(order, [
      { key: "skus", collectionPath: SKUS },
      { key: "discounts", collectionPath: DISCOUNTS },
    ])
  }
}

export default construct(populateImpl)

export type Populate = ReturnType<typeof construct>
