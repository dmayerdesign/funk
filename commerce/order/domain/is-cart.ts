import { Order, Status } from "@funk/commerce/order/domain/order"

export default function (order: Order): boolean {
  return order.status === Status.CART || order.status === Status.CART_CHECKOUT
}
