import { Order, Status } from "@funk/commerce/order/model/order"

export default function (order: Order): boolean {
  return order.status === Status.CART || order.status === Status.CART_CHECKOUT
}
