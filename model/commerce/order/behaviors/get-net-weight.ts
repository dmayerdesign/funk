import { Order } from "@funk/model/commerce/order/order"
import add from "@funk/model/weight/behaviors/add"
import { Weight, UNKNOWN_WEIGHT } from "@funk/model/weight/weight"

export default function (order: Order): Weight {
  if (!!order.skus) {
    return order.skus
      .filter(({ netWeight }) => !!netWeight)
      .map(({ netWeight }) => netWeight)
      .reduce(add, UNKNOWN_WEIGHT)
  }
  return UNKNOWN_WEIGHT
}
