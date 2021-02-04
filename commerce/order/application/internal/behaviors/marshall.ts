import { MarshalledOrder, Order } from "@funk/commerce/order/model/order"
import marshallImpl from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof marshallImpl) {
  return function (order: Order): MarshalledOrder {
    return marshall<MarshalledOrder, Order>(order, ["skus", "discounts"])
  }
}

export default construct(marshallImpl)

export type Marshall = ReturnType<typeof construct>
