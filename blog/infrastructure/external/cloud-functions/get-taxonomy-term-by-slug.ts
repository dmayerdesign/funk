import { TaxonomyTerm } from "@funk/taxonomy/model/taxonomy-term"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "taxonomyGetTermBySlug"
type PayloadType = string | null | undefined
type ResolvedValueType = TaxonomyTerm
export type GetTaxonomyTermBySlug = ReturnType<typeof construct>

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}
