import { Discount, SkuDiscount } from "@funk/commerce/discount/domain/discount"

export default function (discounts: Discount[]): SkuDiscount[] {
  return (discounts?.filter(({ type }) => type === "sku") ??
    []) as SkuDiscount[]
}
