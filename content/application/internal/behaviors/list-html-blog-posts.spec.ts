import {
  construct,
  ListHtmlBlogPosts,
} from "@funk/content/application/internal/behaviors/list-html-blog-posts"
import { List as ListContents } from "@funk/content/application/internal/behaviors/persistence/list"
import { ContentHtmlBlogPost, ContentType } from "@funk/content/model/content"
import { createFakeHtmlBlogPost } from "@funk/content/model/stubs"

describe("listHtmlBlogPosts", () => {
  let list: ListContents
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

    expect(list).toHaveBeenCalledWith(
      expect.objectContaining({
        conditions: expect.arrayContaining([
          expect.arrayContaining(["removedAt", null]),
          expect.arrayContaining(["type", ContentType.HTML_BLOG_POST]),
        ]),
      }),
    )
    expect(posts).toEqual(FAKE_POSTS)
  })
})
