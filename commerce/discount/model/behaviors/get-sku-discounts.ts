import { Discount, SkuDiscount } from "@funk/commerce/discount/model/discount"

export default function (discounts: Discount[]): SkuDiscount[] {
  return (discounts?.filter(({ type }) => type === "sku") ??
    []) as SkuDiscount[]
}
