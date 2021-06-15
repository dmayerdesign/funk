import { ContentHtmlBlogPost } from "@funk/content/model/content"

export const createFakeHtmlBlogPost = (
  partialBlogPost: Partial<ContentHtmlBlogPost> = {},
) =>
  ({
    id: "fake post",
    value: "<fake>html content</fake>",
    ...partialBlogPost,
  } as ContentHtmlBlogPost)
