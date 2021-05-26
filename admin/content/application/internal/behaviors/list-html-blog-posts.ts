import listContents from "@funk/admin/content/application/internal/behaviors/persistence/list"
import {
  ContentHtmlBlogPost,
  ContentType,
} from "@funk/admin/content/model/content"
import { Condition } from "@funk/persistence/application/internal/condition"
import { Pagination } from "@funk/persistence/model/pagination"

interface PayloadType {
  pagination: Pagination<ContentHtmlBlogPost>
  conditions: Condition<ContentHtmlBlogPost>[]
}

export function construct(list = listContents) {
  return async function ({
    pagination,
    conditions = [],
  }: PayloadType): Promise<ContentHtmlBlogPost[]> {
    const fullConditions = [
      ...conditions,
      ["type", "==", ContentType.HTML_BLOG_POST] as Condition<
        ContentHtmlBlogPost
      >,
      ["removedAt", "==", null] as Condition<ContentHtmlBlogPost>,
    ]
    return await list<ContentHtmlBlogPost>({
      pagination,
      conditions: fullConditions,
    })
  }
}

export type ListHtmlBlogPosts = ReturnType<typeof construct>

export default construct()
