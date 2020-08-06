import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"
import marshallImpl from "@funk/api/plugins/persistence/behaviors/marshall"

export function construct(marshall = marshallImpl)
{
  return function(order: Order): MarshalledOrder
  {
    return marshall<MarshalledOrder, Order>(order, [
      "skus",
      "discounts",
    ])
  }
}

export default construct()

export type Marshall = ReturnType<typeof construct>
