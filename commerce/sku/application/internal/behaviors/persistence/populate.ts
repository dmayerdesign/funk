import { ATTRIBUTE_VALUES } from "@funk/commerce/attribute/model/attribute-value"
import { REVIEWS } from "@funk/commerce/review/model/review"
import { Sku } from "@funk/commerce/sku/model/sku"
import { TAXONOMY_TERMS } from "@funk/commerce/taxonomy/model/taxonomy-term"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"

export function construct(populate: typeof genericPopulate) {
  return function (sku: Marshalled<Sku> | undefined): Promise<Sku> {
    return populate<Sku>(sku, [
      { key: "attributeValues", collectionPath: ATTRIBUTE_VALUES },
      { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
      { key: "imageGroups", collectionPath: REVIEWS },
    ])
  }
}

export default construct(genericPopulate)

export type Populate = ReturnType<typeof construct>
