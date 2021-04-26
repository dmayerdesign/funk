import genericList, {
  List as GenericList,
} from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"
import populateImpl, {
  Populate,
} from "@funk/taxonomy/application/internal/behaviors/persistence/populate-term"
import {
  TaxonomyTerm,
  TAXONOMY_TERMS,
} from "@funk/taxonomy/model/taxonomy-term"

export function construct(list: GenericList, populate: Populate) {
  return async function ({
    pagination,
    conditions,
  }: {
    pagination: Pagination<TaxonomyTerm> | VirtualPagination
    conditions: Condition<TaxonomyTerm>[]
  }): Promise<TaxonomyTerm[]> {
    const marshalledTaxonomyTerms = await list<TaxonomyTerm>({
      collection: TAXONOMY_TERMS,
      pagination,
      conditions,
    })

    return await Promise.all(
      marshalledTaxonomyTerms.map(
        (marshalledTaxonomyTerm) =>
          populate(marshalledTaxonomyTerm) as Promise<TaxonomyTerm>,
      ),
    )
  }
}

export type List = ReturnType<typeof construct>

export default construct(genericList, populateImpl)
