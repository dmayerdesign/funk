import { DEFAULT_PAGINATION } from "@funk/persistence/model/pagination"
import listTaxonomyTermsImpl, {
  List as ListTaxonomyTerms,
} from "@funk/taxonomy/application/internal/behaviors/persistence/list-term"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"

export function construct(listTaxonomyTerms: ListTaxonomyTerms) {
  return async function (
    taxonomyTermSlug: string | null | undefined,
  ): Promise<TaxonomyTerm> {
    const [taxonomyTerm] = await listTaxonomyTerms({
      pagination: DEFAULT_PAGINATION,
      conditions: [["slug", "==", taxonomyTermSlug]],
    })
    return taxonomyTerm
  }
}

export type GetTermBySlug = ReturnType<typeof construct>

export default construct(listTaxonomyTermsImpl)
