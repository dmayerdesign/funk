import { MarshalledProduct, PopulatedProduct } from "@funk/model/commerce/product/product"
import { REVIEWS } from "@funk/model/commerce/review/review"
import { TAXONOMY_TERMS } from "@funk/model/commerce/taxonomy/taxonomy-term"
import { ORGANIZATIONS } from "@funk/model/organization/organization"
import populate from "@funk/plugins/persistence/actions/populate"

export default function(product: MarshalledProduct): Promise<PopulatedProduct>
{
  return populate<PopulatedProduct, MarshalledProduct>(product, [
    { key: "brand", collectionPath: ORGANIZATIONS, relationship: "one-to-one" },
    { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
    { key: "reviews", collectionPath: REVIEWS },
  ])
}
