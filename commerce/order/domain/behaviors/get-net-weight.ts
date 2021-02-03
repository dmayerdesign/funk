import { Order } from "@funk/commerce/order/domain/order"
import add from "@funk/weight/domain/behaviors/add"
import { UNKNOWN_WEIGHT, Weight } from "@funk/weight/domain/weight"

export default function (order: Order): Weight {
  if (!!order.skus) {
    return order.skus
      .filter(({ netWeight }) => !!netWeight)
      .map(({ netWeight }) => netWeight)
      .reduce(add, UNKNOWN_WEIGHT)
  }
  return UNKNOWN_WEIGHT
}
