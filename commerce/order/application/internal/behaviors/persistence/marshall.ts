import { Order } from "@funk/commerce/order/model/order"
import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"

export function construct(marshall: typeof genericMarshall) {
  return function (order: Partial<Order>): Marshalled<Order> {
    return marshall(order, ["skus", "discounts"])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
