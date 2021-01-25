import {
  MarshalledProduct,
  Product,
} from "@funk/commerce/product/domain/product"
import { REVIEWS } from "@funk/commerce/review/domain/review"
import { TAXONOMY_TERMS } from "@funk/commerce/taxonomy/domain/taxonomy-term"
import { ORGANIZATIONS } from "@funk/organization/domain/organization"
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
