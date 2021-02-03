import {
  Discount,
  OrderDiscount,
} from "@funk/commerce/discount/domain/discount"

export default function (discounts?: Discount[]): OrderDiscount[] {
  return (discounts?.filter(({ type }) => type === "order") ??
    []) as OrderDiscount[]
}
