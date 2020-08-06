import { Order } from "@funk/model/commerce/order/order"
import { OrderDiscount } from "@funk/model/commerce/discount/discount"

export default function(order: Pick<Order, "discounts">): OrderDiscount[]
{
  return (order?.discounts
    ?.filter(({ type }) => type === "order") ?? []) as OrderDiscount[]
}
