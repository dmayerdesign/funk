import { UserRole } from "@funk/auth/model/user-role"
import visitPostCategoryPage from "@funk/test/features/blog/external/behaviors/visit-post-category-page"
import {
  configureBlogPostsPage,
  TEST_USER_BASIC_ID,
} from "@funk/test/features/blog/external/helpers"

export default function (postTaxonomyTermSlug: string, title: string): void {
  configureBlogPostsPage()
  visitPostCategoryPage(
    postTaxonomyTermSlug,
    TEST_USER_BASIC_ID,
    UserRole.ADMINISTRATOR,
  )
  if (title) {
    cy.get(".posts .card-title").should("contain.text", title)
  } else {
    cy.get(".posts .card-title").first().should("exist")
  }
}
