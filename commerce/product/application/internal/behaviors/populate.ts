import {
    MarshalledProduct,
    Product
} from "@funk/commerce/product/model/product"
import { REVIEWS } from "@funk/commerce/review/model/review"
import { TAXONOMY_TERMS } from "@funk/commerce/taxonomy/model/taxonomy-term"
import { ORGANIZATIONS } from "@funk/organization/model/organization"
import populateImpl from "@funk/persistence/application/internal/behaviors/populate"

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
