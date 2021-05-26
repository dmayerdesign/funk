import {
  construct as constructListHtmlBlogPosts,
  ListHtmlBlogPosts,
} from "@funk/admin/content/application/internal/behaviors/list-html-blog-posts"
import { construct as constructListContents } from "@funk/admin/content/application/internal/behaviors/persistence/list"
import populateContents from "@funk/admin/content/application/internal/behaviors/persistence/populate"
import {
  ContentHtmlBlogPost,
  CONTENTS,
  ContentType,
} from "@funk/admin/content/model/content"
import { createFakeImageGroup } from "@funk/image/model/stubs"
import { Condition } from "@funk/persistence/application/internal/condition"
import { DbDocumentInput } from "@funk/persistence/model/database-document"
import { DEFAULT_PAGINATION } from "@funk/persistence/model/pagination"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import loadFeatureOptions from "@funk/test/configuration/load-feature-options"
import { givenAUser } from "@funk/test/features/blog/internal/helpers"
import { background, rule } from "@funk/test/helpers/internal/helpers"
import list from "@funk/test/plugins/internal/persistence/behaviors/list"
import setById from "@funk/test/plugins/internal/persistence/behaviors/set-by-id"
import { initializeStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { defineFeature, loadFeature } from "jest-cucumber"
import { resolve } from "path"

const feature = loadFeature(
  resolve(__dirname, "../post.feature"),
  loadFeatureOptions,
)

defineFeature(feature, (example) => {
  let listHtmlBlogPosts: ListHtmlBlogPosts
  const listContents = constructListContents(list, populateContents)

  background(async () => {
    await initializeStore()
    listHtmlBlogPosts = constructListHtmlBlogPosts(listContents)
  })

  rule("An anonymous user can view published posts by category.", () => {
    example(
      'Amy visits the default category page ("blog-posts").',
      ({ given, when, then }) => {
        let blogPosts: ContentHtmlBlogPost[]

        givenAUser(given)

        given(
          /that there are blog posts in the category "(.+)"/,
          async (categoryId: PrimaryKey) => {
            const blogPostsInBlogCategory = await list({
              collection: CONTENTS,
              pagination: DEFAULT_PAGINATION,
              conditions: [
                ["taxonomyTerms", "array-contains", categoryId],
              ] as Condition<ContentHtmlBlogPost>[],
            })
            expect(blogPostsInBlogCategory.length).toBeGreaterThan(1)
          },
        )

        given(
          /some blog posts in the category "(.+)" are in the trash/,
          async (categoryId: PrimaryKey) => {
            const sharedFakeImageGroup = createFakeImageGroup()
            await setById<DbDocumentInput<ContentHtmlBlogPost>>(
              CONTENTS,
              "fake-trash-post-1",
              {
                type: ContentType.HTML_BLOG_POST,
                title: "Fake Trash Post 1",
                value: "Content of fake trash post 1.",
                coverImageGroup: sharedFakeImageGroup,
                taxonomyTerms: [categoryId],
                removedAt: Date.now(),
              } as DbDocumentInput<ContentHtmlBlogPost>,
            )
            await setById<DbDocumentInput<ContentHtmlBlogPost>>(
              CONTENTS,
              "fake-trash-post-2",
              {
                type: ContentType.HTML_BLOG_POST,
                title: "Fake Trash Post 2",
                value: "Content of fake trash post 2.",
                coverImageGroup: sharedFakeImageGroup,
                taxonomyTerms: [categoryId],
                removedAt: Date.now(),
              } as DbDocumentInput<ContentHtmlBlogPost>,
            )
            await setById<DbDocumentInput<ContentHtmlBlogPost>>(
              CONTENTS,
              "fake-trash-post-3",
              {
                type: ContentType.HTML_BLOG_POST,
                title: "Fake Trash Post 3",
                value: "Content of fake trash post 3.",
                coverImageGroup: sharedFakeImageGroup,
                taxonomyTerms: [],
                removedAt: Date.now(),
              } as DbDocumentInput<ContentHtmlBlogPost>,
            )
          },
        )

        when(
          /Amy requests all blog posts in the category "(.+)"/,
          async (categoryId: PrimaryKey) => {
            blogPosts = await listHtmlBlogPosts({
              pagination: DEFAULT_PAGINATION,
              conditions: [["taxonomyTerms", "array-contains", categoryId]],
            })
          },
        )

        then(
          /Amy gets all blog posts in the category "(.+)"/,
          async (categoryId: PrimaryKey) => {
            expect(blogPosts.length).toBeGreaterThan(1)
            expect(
              blogPosts.every((post) =>
                post.taxonomyTerms?.includes(categoryId),
              ),
            ).toBe(true)
          },
        )

        then("none of the blog posts are in the trash", async () => {
          expect(
            blogPosts.some((post) => typeof post.removedAt === "number"),
          ).toBe(false)
        })

        then(
          "each blog post is represented by its title and its cover image",
          async () => {
            expect(
              blogPosts.every(
                (post) =>
                  typeof post.title === "string" && !!post.coverImageGroup,
              ),
            )
          },
        )
      },
    )
  })
})
