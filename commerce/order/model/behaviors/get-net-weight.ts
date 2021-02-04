import { Order } from "@funk/commerce/order/model/order"
import add from "@funk/things/model/weight/behaviors/add"
import { UNKNOWN_WEIGHT, Weight } from "@funk/things/model/weight/weight"

export default function (order: Order): Weight {
  if (!!order.skus) {
    return order.skus
      .filter(({ netWeight }) => !!netWeight)
      .map(({ netWeight }) => netWeight)
      .reduce(add, UNKNOWN_WEIGHT)
  }
  return UNKNOWN_WEIGHT
}
