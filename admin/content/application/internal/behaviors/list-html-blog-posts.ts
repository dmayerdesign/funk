import {
  ContentHtmlBlogPost,
  CONTENTS,
} from "@funk/admin/content/model/content"
import listImpl from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"
import { Pagination } from "@funk/persistence/model/pagination"

interface PayloadType {
  pagination: Pagination<ContentHtmlBlogPost>
  conditions: Condition<ContentHtmlBlogPost>[]
}

export function construct(list = listImpl) {
  return async function ({
    pagination,
    conditions = [],
  }: PayloadType): Promise<ContentHtmlBlogPost[]> {
    const fullConditions = [
      ...conditions,
      ["removedAt", "in", [null, undefined, ""]] as Condition<
        ContentHtmlBlogPost
      >,
    ]
    return await list({
      collection: CONTENTS,
      pagination,
      conditions: fullConditions,
    })
  }
}

export type ListHtmlBlogPosts = ReturnType<typeof construct>

export default construct()
