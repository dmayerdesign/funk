import { Condition } from "@funk/persistence/application/external/condition"
import { Pagination } from "@funk/persistence/model/pagination"
import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

export const functionName = "taxonomyListTerm"
export interface PayloadType {
  pagination: Pagination
  conditions: Condition<TaxonomyTerm>[]
}
export type ResolvedValueType = TaxonomyTerm[]
export type ListTaxonomyTerms = ReturnType<typeof construct>

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}
