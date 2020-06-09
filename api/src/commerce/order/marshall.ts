import { MarshalledOrder, PopulatedOrder } from "@funk/model/commerce/order/order"
import marshallImpl from "@funk/plugins/persistence/actions/marshall"

export function construct(marshall = marshallImpl)
{
  return function(order: PopulatedOrder): MarshalledOrder
  {
    return marshall<MarshalledOrder, PopulatedOrder>(order, [
      "skus",
      "discounts",
    ])
  }
}

export default construct()

export type Marshall = ReturnType<typeof construct>
