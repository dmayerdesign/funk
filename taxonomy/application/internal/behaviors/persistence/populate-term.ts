import { Marshalled } from "@funk/persistence/application/internal/behaviors/marshall"
import genericPopulate from "@funk/persistence/application/internal/behaviors/populate"
import {
  TaxonomyTerm,
  TAXONOMY_TERMS,
} from "@funk/taxonomy/model/taxonomy-term"

export function construct(populate: typeof genericPopulate) {
  return function (
    taxonomyTerm: Marshalled<TaxonomyTerm> | undefined,
  ): Promise<TaxonomyTerm> {
    return populate<TaxonomyTerm>(taxonomyTerm, [
      {
        key: "parent",
        collectionPath: TAXONOMY_TERMS,
        relationship: "one-to-one",
      },
      { key: "children", collectionPath: TAXONOMY_TERMS },
    ])
  }
}

export default construct(genericPopulate)

export type Populate = ReturnType<typeof construct>
