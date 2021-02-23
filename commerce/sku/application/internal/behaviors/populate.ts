import { REVIEWS } from "@funk/commerce/review/model/review"
import { MarshalledSku, Sku } from "@funk/commerce/sku/model/sku"
import populateImpl from "@funk/persistence/application/internal/behaviors/populate"
import { TAXONOMY_TERMS } from "@funk/taxonomy/model/taxonomy-term"

export function construct(populate: typeof populateImpl) {
  return function (sku: MarshalledSku): Promise<Sku> {
    return populate<Sku, MarshalledSku>(sku, [
      { key: "attributeValues", collectionPath: TAXONOMY_TERMS },
      { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
      { key: "imageGroups", collectionPath: REVIEWS },
    ])
  }
}

export default construct(populateImpl)

export type Populate = ReturnType<typeof construct>
