import {
  ContentHtmlBlogPost,
  CONTENTS,
} from "@funk/admin/content/model/content"
import namePattern from "@funk/helpers/name-pattern"
import { Condition } from "@funk/persistence/application/internal/condition"
import { DEFAULT_PAGINATION } from "@funk/persistence/model/pagination"
import loadFeatureOptions from "@funk/test/configuration/load-feature-options"
import { givenAUser } from "@funk/test/features/blog/internal/helpers"
import { background, rule } from "@funk/test/helpers/internal/helpers"
import list from "@funk/test/plugins/internal/persistence/behaviors/list"
import { initializeStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { defineFeature, loadFeature } from "jest-cucumber"
import { resolve } from "path"

const feature = loadFeature(
  resolve(__dirname, "../post.feature"),
  loadFeatureOptions,
)

defineFeature(feature, function (example) {
  background(async () => {
    await initializeStore()
  })

  rule("An anonymous user can view published posts by category.", () => {
    example('Amy visits the default category page ("blog").', function ({
      given,
      when,
      then,
    }) {
      givenAUser(given)

      given(/that there are blog posts in the category "blog"/, async () => {
        const blogPostsInBlogCategory = await list({
          collection: CONTENTS,
          pagination: DEFAULT_PAGINATION,
          conditions: [
            ["taxonomies.blog-post-categories", "array-contains", "blog"],
          ] as Condition<ContentHtmlBlogPost>[],
        })
        expect(blogPostsInBlogCategory.length).toBeGreaterThan(1)
      })

      given(/there are blog posts in the trash/, async () => {})

      when(
        new RegExp(
          `${namePattern} requests all blog posts in the category "blog"`,
        ),
        () => {},
      )

      then(
        new RegExp(`${namePattern} gets all blog posts in the category "blog"`),
        async () => {},
      )

      then("none of the blog posts are in the trash", async () => {})

      then(
        "each blog post is represented by its title and its cover image",
        async () => {},
      )
    })
  })
})
