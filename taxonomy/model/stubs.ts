import { TaxonomyTerm } from "./taxonomy-term"

export function createFakeTaxonomyTerm({
  id = "fake taxonomy term id",
  taxonomyId = "fake taxonomy id",
} = {}): TaxonomyTerm {
  return {
    id,
    slug: id,
    taxonomyId,
    singularName: "fake taxonomy term name",
    pluralName: "fake taxonomy term plural name",
    description: "fake description",
    forInternalUseOnly: false,
  }
}
