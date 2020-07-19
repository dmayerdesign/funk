import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { WeightUnit } from "@funk/model/units/weight-unit"
import { CurrencyCode } from "@funk/model/money/currency-code"

export const createFakeMarshalledSku = (id = "sku id"): MarshalledSku => ({
  id,
  name: "fake marshalled sku",
  productId: `product id for ${id}`,
  price: { amount: 1000, currency: CurrencyCode.USD },
  taxonomyTerms: [ `tax term for ${id}` ],
  attributeValues: {},
  inventory: {
    type: "finite",
    quantity: 1,
    quantityPending: 0,
  },
  netWeight: { amount: 2, unit: WeightUnit.OUNCES },
})

export const createFakeSku = (id = "sku id"): Sku => ({
  id,
  name: "fake sku",
  productId: `product id for ${id}`,
  price: { amount: 1000, currency: CurrencyCode.USD },
  taxonomyTerms: [
    {
      id: `tax term for ${id}`,
      taxonomyId: "taxonomy id",
      singularName: "singular name",
      pluralName: "plural name",
      description: "description",
      children: [],
      forInternalUseOnly: false,
    },
  ],
  attributeValues: {},
  inventory: {
    type: "finite",
    quantity: 1,
    quantityPending: 0,
  },
  netWeight: { amount: 2, unit: WeightUnit.OUNCES },
})
