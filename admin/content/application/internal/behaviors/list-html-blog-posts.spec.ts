import {
  construct,
  ListHtmlBlogPosts,
} from "@funk/admin/content/application/internal/behaviors/list-html-blog-posts"
import {
  ContentHtmlBlogPost,
  CONTENTS,
} from "@funk/admin/content/model/content"
import { createFakeHtmlBlogPost } from "@funk/admin/content/model/stubs"
import { List } from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"

describe("listHtmlBlogPosts", () => {
  let list: List
  let listHtmlBlogPosts: ListHtmlBlogPosts

  const FAKE_PARAMS: Parameters<ListHtmlBlogPosts> = [
    {
      pagination: {
        orderBy: "createdAt" as "createdAt",
        orderByDirection: "desc",
        skip: 0,
        take: 25,
      },
      conditions: [],
    },
  ]
  const FAKE_POSTS: ContentHtmlBlogPost[] = [createFakeHtmlBlogPost()]

  beforeEach(() => {
    list = jest.fn().mockResolvedValue(FAKE_POSTS)

    listHtmlBlogPosts = construct(list)
  })

  it("should list blog posts", async () => {
    const posts = await listHtmlBlogPosts(...FAKE_PARAMS)

    expect(list).toHaveBeenCalledWith({
      ...FAKE_PARAMS[0],
      collection: CONTENTS,
      conditions: [
        ...FAKE_PARAMS[0].conditions,
        ["taxonomies.blog-post-categories", "array-contains", "blogs"],
      ] as Condition<ContentHtmlBlogPost>[],
    })
    expect(posts).toEqual(FAKE_POSTS)
  })
})
