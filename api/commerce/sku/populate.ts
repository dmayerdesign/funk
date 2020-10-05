import populateImpl from "@funk/api/plugins/persistence/behaviors/populate"
import { REVIEWS } from "@funk/model/commerce/review/review"
import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { TAXONOMY_TERMS } from "@funk/model/commerce/taxonomy/taxonomy-term"

export function construct(populate: typeof populateImpl)
{
  return function(sku: MarshalledSku): Promise<Sku>
  {
    return populate<Sku, MarshalledSku>(sku, [
      { key: "attributeValues", collectionPath: TAXONOMY_TERMS },
      { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
      { key: "imageGroups", collectionPath: REVIEWS },
    ])
  }
}

export default construct(populateImpl)

export type Populate = ReturnType<typeof construct>
