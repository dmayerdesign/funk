import {
  AddHtmlBlogPostCoverImage,
  construct as constructAddHtmlBlogPostCoverImage,
} from "@funk/admin/content/application/internal/behaviors/add-html-blog-post-cover-image"
import {
  ContentHtmlBlogPost,
  CONTENTS,
} from "@funk/admin/content/model/content"
import { createFakeHtmlBlogPost } from "@funk/admin/content/model/stubs"
import { IMAGE_GROUP } from "@funk/admin/image-group/model/image-group"
import { createFakeImageGroup } from "@funk/image/model/stubs"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import loadFeatureOptions from "@funk/test/configuration/load-feature-options"
import { background, rule } from "@funk/test/helpers/internal/helpers"
import getById from "@funk/test/plugins/internal/persistence/behaviors/get-by-id"
import setMany from "@funk/test/plugins/internal/persistence/behaviors/set-many"
import { initializeStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { defineFeature, loadFeature } from "jest-cucumber"
import { resolve } from "path"

const feature = loadFeature(
  resolve(__dirname, "../post-cover-image.feature"),
  loadFeatureOptions,
)

defineFeature(feature, (example) => {
  let addHtmlBlogPostCoverImage: AddHtmlBlogPostCoverImage

  background(async () => {
    await initializeStore()
    addHtmlBlogPostCoverImage = constructAddHtmlBlogPostCoverImage(setMany)
  })

  rule("An admin can add a cover image to a blog post.", () => {
    let postId: PrimaryKey

    example(
      "Paul adds a cover image to a blog post.",
      async ({ given, when, then, and }) => {
        given("an admin named Paul", () => {})
        and("that Paul has a blog post", () => {
          const post = createFakeHtmlBlogPost()
          postId = post.id
        })

        when("Paul intends to add a new cover image", async () => {
          await addHtmlBlogPostCoverImage({
            contentId: postId,
            images: createFakeImageGroup().images,
          })
        })

        then("a new cover image is added", async () => {
          const updatedPost = (await getById(
            CONTENTS,
            postId,
          )) as ContentHtmlBlogPost
          const newCoverImageGroup = await getById(
            IMAGE_GROUP,
            updatedPost.coverImageGroup.id,
          )
          expect(newCoverImageGroup).toBeDefined()
        })
      },
    )
  })
})
