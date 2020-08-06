import { MarshalledSku, Sku } from "@funk/model/commerce/sku/sku"
import { REVIEWS } from "@funk/model/commerce/review/review"
import { TAXONOMY_TERMS } from "@funk/model/commerce/taxonomy/taxonomy-term"
import populateImpl from "@funk/api/plugins/persistence/behaviors/populate"

export function construct(populate = populateImpl)
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

export default construct()

export type Populate = ReturnType<typeof construct>
