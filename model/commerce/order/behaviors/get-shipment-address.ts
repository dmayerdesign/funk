import { Address } from "@funk/model/address/address"
import { Order } from "@funk/model/commerce/order/order"

export default function (order: Pick<Order, "customer">): Address | undefined {
  return order?.customer?.shippingAddress
}
