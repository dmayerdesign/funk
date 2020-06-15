import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { WeightUnit } from "@funk/model/units/weight-unit"

export const createFakeMarshalledSku = (id = "sku id") => ({
  id,
  productId: `product id for ${id}`,
  price: { amount: 1000, currency: "USD" },
  taxonomyTerms: [ `tax term for ${id}` ],
  netWeight: { amount: 2, unit: WeightUnit.OUNCES },
}) as MarshalledSku

export const createFakeSku = (id = "sku id") => ({
  id,
  productId: `product id for ${id}`,
  price: { amount: 1000, currency: "USD" },
  taxonomyTerms: [ { id: `tax term for ${id}` } ],
  netWeight: { amount: 2, unit: WeightUnit.OUNCES },
}) as Sku
