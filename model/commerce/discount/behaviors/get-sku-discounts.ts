import { Discount, SkuDiscount } from "@funk/model/commerce/discount/discount"

export default function (discounts: Discount[]): SkuDiscount[] {
  return (discounts?.filter(({ type }) => type === "sku") ??
    []) as SkuDiscount[]
}
