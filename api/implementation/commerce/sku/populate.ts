import { MarshalledSku, PopulatedSku } from "@funk/model/commerce/sku/sku"
import { REVIEWS } from "@funk/model/commerce/review/review"
import { TAXONOMY_TERMS } from "@funk/model/commerce/taxonomy/taxonomy-term"
import populateImpl from "@funk/plugins/persistence/actions/populate"

export function construct(populate = populateImpl)
{
  return function(sku: MarshalledSku): Promise<PopulatedSku>
  {
    return populate<PopulatedSku, MarshalledSku>(sku, [
      { key: "attributeValues", collectionPath: TAXONOMY_TERMS },
      { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
      { key: "imageGroups", collectionPath: REVIEWS },
    ])
  }
}

export default construct()

export type Populate = ReturnType<typeof construct>
