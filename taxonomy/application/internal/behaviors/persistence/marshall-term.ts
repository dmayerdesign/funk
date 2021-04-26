import genericMarshall, {
  Marshalled,
} from "@funk/persistence/application/internal/behaviors/marshall"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

export function construct(marshall: typeof genericMarshall) {
  return function (
    taxonomyTerm: Partial<TaxonomyTerm>,
  ): Marshalled<TaxonomyTerm> {
    return marshall(taxonomyTerm, ["parent", "children"])
  }
}

export default construct(genericMarshall)

export type Marshall = ReturnType<typeof construct>
