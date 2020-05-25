import { DISCOUNTS } from "@funk/model/commerce/discount/discount"
import { MarshalledOrder, PopulatedOrder } from "@funk/model/commerce/order/order"
import { SKUS } from "@funk/model/commerce/product/sku/sku"
import populate from "@funk/plugins/persistence/actions/populate"

export default function(order: MarshalledOrder): Promise<PopulatedOrder>
{
  return populate<PopulatedOrder, MarshalledOrder>(order, [
    { key: "skus", collectionPath: SKUS },
    { key: "discounts", collectionPath: DISCOUNTS },
  ])
}
