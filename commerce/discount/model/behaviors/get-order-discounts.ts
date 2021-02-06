import { Discount, OrderDiscount } from "@funk/commerce/discount/model/discount"

export default function (discounts?: Discount[]): OrderDiscount[] {
  return (discounts?.filter(({ type }) => type === "order") ??
    []) as OrderDiscount[]
}
