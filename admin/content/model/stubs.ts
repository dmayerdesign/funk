import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"

export const createFakeHtmlBlogPost = (
  partialBlogPost: Partial<ContentHtmlBlogPost> = {},
) =>
  ({
    id: "fake post",
    value: "<fake>html content</fake>",
    ...partialBlogPost,
  } as ContentHtmlBlogPost)
