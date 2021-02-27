import { ContentHtmlBlogPost } from "@funk/admin/content/model/content"

export const createFakeHtmlBlogPost = () =>
  ({
    id: "fake post",
    value: "<fake>html content</fake>",
  } as ContentHtmlBlogPost)
