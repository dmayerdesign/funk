import { Content, CONTENTS } from "@funk/admin/content/model/content"
import { createFakeHtmlBlogPost } from "@funk/admin/content/model/stubs"
import { STORE_SERVER_PORT } from "@funk/test/plugins/external/persistence/configuration"
import http from "axios"
import { pickBy, values } from "lodash"
import { v4 as uuid } from "uuid"

const plugins: Cypress.PluginConfig = function (on, config) {
  on("task", {
    async tearDown(): Promise<null> {
      await http.get(`http://localhost:${STORE_SERVER_PORT}/reset`)
      return null
    },
    async setUp(): Promise<null> {
      const store: Record<string, any> = (
        await http.get(`http://localhost:${STORE_SERVER_PORT}/store`)
      ).data
      let blogPostsContents = values(
        pickBy(store["contents"], ({ taxonomyTerms }) =>
          taxonomyTerms?.includes("blog-posts"),
        ),
      )

      // Given there is a blog post for the post category page "blog-posts"
      if (!blogPostsContents.length) {
        await setBlogPostContents({
          "fake-blog-post": createFakeHtmlBlogPost({
            title: "fake blog post title",
            value: "fake blog post value",
            taxonomyTerms: ["blog-posts"],
          }),
        })
      }

      // And some blog posts in the category "blog-posts" are in the trash
      const someBlogPostsAreAlreadyInTheTrash = blogPostsContents.some(
        ({ removedAt }) => removedAt != null,
      )
      if (!someBlogPostsAreAlreadyInTheTrash) {
        await setBlogPostContents({
          [uuid()]: createFakeHtmlBlogPost({
            taxonomyTerms: ["blog-posts"],
            removedAt: Date.now(),
          }),
        })
      }

      async function setBlogPostContents(
        contentUpdates: Record<string, Content>,
      ): Promise<void> {
        const newContents = {
          ...store.contents,
          ...contentUpdates,
        }
        await http.post(`http://localhost:${STORE_SERVER_PORT}/store`, {
          ...store,
          [CONTENTS]: newContents,
        })
        blogPostsContents = values(
          pickBy(newContents, ({ taxonomyTerms }) =>
            taxonomyTerms?.includes("blog-posts"),
          ),
        )
      }

      return null
    },
  })
}

module.exports = plugins
