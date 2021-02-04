import { Order } from "@funk/commerce/order/model/order"
import { Address } from "@funk/places/model/address"

export default function (order: Pick<Order, "customer">): Address | undefined {
  return order?.customer?.shippingAddress
}
