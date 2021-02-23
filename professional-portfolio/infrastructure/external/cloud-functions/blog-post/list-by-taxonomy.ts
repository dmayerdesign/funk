import { HtmlBlogPost } from "@funk/admin/content/model/content"
import {
  Pagination,
  VirtualPagination
} from "@funk/persistence/model/pagination"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "professionalPortfolioBlogPostListByTaxonomy"
interface PayloadType {
  pagination: Pagination<HtmlBlogPost> | VirtualPagination
  taxonomyMap: Record<string, string[]>
}
type ResolvedValueType = HtmlBlogPost[]

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}

export type ListByTaxonomy = ReturnType<typeof construct>
