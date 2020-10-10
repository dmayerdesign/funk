import marshallImpl from "@funk/api/plugins/persistence/behaviors/marshall"
import { MarshalledOrder, Order } from "@funk/model/commerce/order/order"

export function construct(marshall: typeof marshallImpl) {
  return function (order: Order): MarshalledOrder {
    return marshall<MarshalledOrder, Order>(order, ["skus", "discounts"])
  }
}

export default construct(marshallImpl)

export type Marshall = ReturnType<typeof construct>
