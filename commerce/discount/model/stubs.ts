import {
  OrderDiscount,
  SkuDiscount,
} from "@funk/commerce/discount/model/discount"

export function createFakeOrderDiscount(
  id = "test discount",
  startAt = Date.now() - 60000000,
  endAt = Date.now() + 60000000,
): OrderDiscount {
  return {
    id,
    type: "order",
    startAt,
    endAt,
    isCompoundable: false,
  }
}

export function createFakeSkuDiscount(
  id = "test discount",
  startAt = Date.now() - 60000000,
  endAt = Date.now() + 60000000,
): SkuDiscount {
  return {
    id,
    type: "sku",
    startAt,
    endAt,
    includes: [],
    excludes: [],
    isCompoundable: false,
  } as SkuDiscount
}
