import { ATTRIBUTE_VALUES } from "@funk/attribute/model/attribute-value"
import { REVIEWS } from "@funk/commerce/review/model/review"
import { Sku } from "@funk/commerce/sku/model/sku"
import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"
import { TAXONOMY_TERMS } from "@funk/taxonomy/model/taxonomy-term"

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
