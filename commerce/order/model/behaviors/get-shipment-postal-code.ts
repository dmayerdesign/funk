import { Order } from "@funk/commerce/order/model/order"

export default function (order: Pick<Order, "customer">): string | undefined {
  return order?.customer?.shippingAddress?.zip
}
