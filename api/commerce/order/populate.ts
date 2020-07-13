import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import { SKUS } from "@funk/model/commerce/sku/sku"
import populateImpl from "@funk/api/plugins/persistence/actions/populate"

export function construct(populate = populateImpl)
{
  return function(order: MarshalledOrder): Promise<Order>
  {
    return populate<Order, MarshalledOrder>(order, [
      { key: "skus", collectionPath: SKUS },
      { key: "discounts", collectionPath: DISCOUNTS },
    ])
  }
}

export default construct()

export type Populate = ReturnType<typeof construct>