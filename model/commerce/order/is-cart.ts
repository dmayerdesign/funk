import { Order, Status } from "@funk/model/commerce/order/order"

export default function (order: Order): boolean {
  return order.status === Status.CART || order.status === Status.CART_CHECKOUT
}
