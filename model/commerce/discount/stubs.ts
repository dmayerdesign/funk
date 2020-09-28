import { OrderDiscount, SkuDiscount } from "@funk/model/commerce/discount/discount"

export function createFakeOrderDiscount(
  id = "test discount"
): OrderDiscount
{
  const DISCOUNT_START_DATE = Date.now() - 60000000
  const DISCOUNT_END_DATE = Date.now() + 60000000
  return {
    id,
    type: "order",
    startAt: DISCOUNT_START_DATE,
    endAt: DISCOUNT_END_DATE,
    isCompoundable: false,
  }
}

export function createFakeSkuDiscount(
  id = "test discount"
): SkuDiscount
{
  const DISCOUNT_START_DATE = Date.now() - 60000000
  const DISCOUNT_END_DATE = Date.now() + 60000000
  return {
    id,
    type: "sku",
    startAt: DISCOUNT_START_DATE,
    endAt: DISCOUNT_END_DATE,
    includes: [],
    excludes: [],
    isCompoundable: false,
  } as SkuDiscount
}
