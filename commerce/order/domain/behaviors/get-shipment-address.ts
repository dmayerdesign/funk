import { Order } from "@funk/commerce/order/domain/order"
import { Address } from "@funk/places/domain/address"

export default function (order: Pick<Order, "customer">): Address | undefined {
  return order?.customer?.shippingAddress
}
