import { MarshalledSku, Sku } from "@funk/commerce/sku/domain/sku"
import { CurrencyCode } from "@funk/money/domain/currency-code"
import { WeightUnit } from "@funk/units/domain/weight-unit"
import { merge } from "lodash"

export const createFakeMarshalledSku = (
  id = "sku-id",
  customProps: Partial<MarshalledSku> = {},
): MarshalledSku =>
  merge(
    {
      id,
      name: "fake marshalled sku",
      productId: `product id for ${id}`,
      price: { amount: 1000, currency: CurrencyCode.USD },
      taxonomyTerms: [`tax-term-for-${id}`],
      attributeValues: {
        ["attribute-for-" + id]: `attribute-value-for-${id}`,
      },
      inventory: {
        type: "finite",
        quantity: 1,
        quantityReserved: 0,
      },
      netWeight: { amount: 2, unit: WeightUnit.OUNCES },
    },
    customProps,
  )

export const createFakeSku = (
  id = "sku-id",
  customProps: Partial<Sku> = {},
): Sku =>
  merge(
    {
      id,
      name: "fake sku",
      productId: `product id for ${id}`,
      price: { amount: 1000, currency: CurrencyCode.USD },
      taxonomyTerms: [
        {
          id: `tax-term-for-${id}`,
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
        quantityReserved: 0,
      },
      netWeight: { amount: 2, unit: WeightUnit.OUNCES },
    },
    customProps,
  )
