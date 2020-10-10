import populateImpl from "@funk/api/plugins/persistence/behaviors/populate"
import {
  MarshalledProduct,
  Product,
} from "@funk/model/commerce/product/product"
import { REVIEWS } from "@funk/model/commerce/review/review"
import { TAXONOMY_TERMS } from "@funk/model/commerce/taxonomy/taxonomy-term"
import { ORGANIZATIONS } from "@funk/model/organization/organization"

export function construct(populate: typeof populateImpl) {
  return function (product: MarshalledProduct): Promise<Product> {
    return populate<Product, MarshalledProduct>(product, [
      {
        key: "brand",
        collectionPath: ORGANIZATIONS,
        relationship: "one-to-one",
      },
      { key: "taxonomyTerms", collectionPath: TAXONOMY_TERMS },
      { key: "reviews", collectionPath: REVIEWS },
    ])
  }
}

export default construct(populateImpl)
