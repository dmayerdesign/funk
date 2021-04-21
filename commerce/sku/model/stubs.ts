import { createFakeAttributeValue } from "@funk/attribute/model/stubs"
import { Sku } from "@funk/commerce/sku/model/sku"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { createFakeTaxonomyTerm } from "@funk/taxonomy/model/stubs"
import { WeightUnit } from "@funk/things/model/weight/weight-unit"
import { merge } from "lodash"

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
        createFakeTaxonomyTerm({
          id: "taxonomy-term-for-" + id,
          taxonomyId: "taxonomy-for-" + id,
        }),
      ],
      attributeValues: [
        createFakeAttributeValue({
          attributeId: "attribute-for-" + id,
          displayValue: "attribute value for " + id,
        }),
      ],
      inventory: {
        type: "finite",
        quantity: 1,
        quantityReserved: 0,
      },
      netWeight: { amount: 2, unit: WeightUnit.OUNCES },
      imageGroups: [],
    } as Sku,
    customProps,
  )
