import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"
import { Condition } from "@funk/persistence/application/external/condition"
import { Pagination } from "@funk/persistence/model/pagination"
import { FunctionsClient } from "@funk/ui/infrastructure/external/helpers/functions-client"

const functionName = "adminContentListHtmlBlogPosts"
interface PayloadType {
  pagination: Pagination<ContentHtmlBlogPost>
  conditions: Condition<ContentHtmlBlogPost>[]
}
type ResolvedValueType = ContentHtmlBlogPost[]
export type ListHtmlBlogPosts = ReturnType<typeof construct>

export function construct(client: FunctionsClient) {
  return async function (payload: PayloadType): Promise<ResolvedValueType> {
    return client.rpcAuthorized<PayloadType, ResolvedValueType>(
      functionName,
      payload,
    )
  }
}
