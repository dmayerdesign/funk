import { UserRole } from "@funk/auth/model/user-role"
import visitPostCategoryPage from "@funk/test/features/blog/external/behaviors/visit-post-category-page"
import {
  configureBlogPostsPage,
  TEST_USER_ADMIN_ID,
} from "@funk/test/features/blog/external/helpers"
import { example, rule } from "@funk/test/helpers/external/helpers"
import addACoverImage from "./behaviors/add-a-cover-image"

rule("An admin can add a cover image to a blog post.", () => {
  before(() => {
    // Given an admin named Paul
    // And that Paul has a blog post
    configureBlogPostsPage()
    visitPostCategoryPage(
      "blog-posts",
      TEST_USER_ADMIN_ID,
      UserRole.ADMINISTRATOR,
    )
  })

  example("Paul adds a cover image to a blog post.", () => {
    // When Paul intends to add a new cover image
    const fakeCoverImageGroup = addACoverImage()
    // Then a new cover image is added
    cy.get(".post-card-media").should(
      "have.css",
      "background-image",
      fakeCoverImageGroup.images[fakeCoverImageGroup.largeSize].url,
    )
  })
})
