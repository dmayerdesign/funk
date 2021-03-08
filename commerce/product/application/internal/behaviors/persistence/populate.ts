import { ATTRIBUTE_VALUES } from "@funk/commerce/attribute/model/attribute-value"
import { Product } from "@funk/commerce/product/model/product"
import { REVIEWS } from "@funk/commerce/review/model/review"
import { TAXONOMY_TERMS } from "@funk/commerce/taxonomy/model/taxonomy-term"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"

export function construct(populate: typeof genericPopulate) {
  return function (product: Marshalled<Product> | undefined): Promise<Product> {
    return populate<Product>(product, [
      { key: "attributeValues", collectionPath: ATTRIBUTE_VALUES },
      { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
      { key: "reviews", collectionPath: REVIEWS },
      {
        key: "brand",
        collectionPath: ORGANIZATIONS,
        relationship: "one-to-one",
      },
    ])
  }
}

export default construct(genericPopulate)

export type Populate = ReturnType<typeof construct>
