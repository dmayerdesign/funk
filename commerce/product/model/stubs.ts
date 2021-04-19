import { createFakeAttributeValue } from "@funk/commerce/attribute/model/stubs"
import { Product } from "@funk/commerce/product/model/product"
import { CurrencyCode } from "@funk/money/model/currency-code"
import { createFakeTaxonomyTerm } from "@funk/taxonomy/model/stubs"
import { merge } from "lodash"

export const createFakeProduct = (
  id = "product-id",
  customProps: Partial<Product> = {},
): Product =>
  merge(
    {
      id,
      name: "fake product",
      priceRange: {
        min: { amount: 1000, currency: CurrencyCode.USD },
        max: { amount: 2000, currency: CurrencyCode.USD },
      },
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
      imageGroups: [],
      reviews: [],
    } as Product,
    customProps,
  )
