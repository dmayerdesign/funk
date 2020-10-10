import { Order } from "@funk/model/commerce/order/order"

export default function (order: Pick<Order, "customer">): string | undefined {
  return order?.customer?.shippingAddress?.zip
}
