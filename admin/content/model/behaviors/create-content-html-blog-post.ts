import {
  ContentHtmlBlogPost,
  ContentType,
} from "@funk/admin/content/model/content"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export default function (
  id: PrimaryKey,
  contentData: Partial<Omit<ContentHtmlBlogPost, "id" | "type">> = {},
): ContentHtmlBlogPost {
  return {
    type: ContentType.HTML_BLOG_POST,
    title: "",
    value: "",
    coverImageUrl: "",
    taxonomyTerms: [],
    removedAt: null,
    ...contentData,
    id,
  }
}
