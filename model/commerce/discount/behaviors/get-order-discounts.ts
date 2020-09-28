import { Discount, OrderDiscount } from "@funk/model/commerce/discount/discount"

export default function(discounts?: Discount[]): OrderDiscount[]
{
  return (discounts?.filter(({ type }) => type === "order") ?? []) as OrderDiscount[]
}
