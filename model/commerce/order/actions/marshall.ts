import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import marshall from "@funk/plugins/persistence/actions/marshall"

export default function(order: Order): MarshalledOrder
{
  return marshall<MarshalledOrder, Order>(order, [
    "skus",
    "discounts",
  ])
}
