import { createFakeHtmlBlogPost } from "@funk/admin/content/model/stubs"
import { UserRole } from "@funk/auth/model/user-role"
import {
  functionName as GET_TAXONOMY_TERM_BY_SLUG,
  ResolvedValueType as GetTaxonomyTermBySlugResponse,
} from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import {
  functionName as LIST_HTML_BLOG_POSTS,
  ResolvedValueType as ListHtmlBlogPostsResponse,
} from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import { FUNCTIONS_BASE_URL } from "@funk/configuration"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { createFakeTaxonomyTerm } from "@funk/taxonomy/model/stubs"
import {
  TEST_USER_ADMIN_ID,
  visitPostCategoryPage,
} from "@funk/test/features/blog/external/helpers"
import { example, rule } from "@funk/test/helpers/external/helpers"

rule("An admin can write a blog post.", () => {
  let testUserId: PrimaryKey

  before(() => {
    // Given an admin named Paul
    testUserId = TEST_USER_ADMIN_ID
    // When Paul visits the post category page "blog-posts"
    configureBlogPostsPage()
    visitPostCategoryPage("blog-posts", testUserId, UserRole.ADMINISTRATOR)
    // cy.get("#portfolio-loading").should("exist")
    cy.get("#portfolio-loading").should("not.exist")
  })

  example("Paul intends to add a blog post.", () => {
    // Then Paul is able to add a post
    cy.get(".add-post-button").click()
    cy.get("#blog-post-editor-drawer").should("be.visible")
  })

  example("Paul starts writing a blog post.", () => {
    // When Paul begins to write a blog post
    cy.get("#blog-post-editor-title-input input").type("Test Blog Post")
    // Then the blog post is saved
    // And the blog post has the taxonomy term "blog-posts"
  })
})

rule("An admin can publish a blog post.", () => {
  let testUserId: PrimaryKey

  before(() => {
    // Given an admin named Paul
    testUserId = TEST_USER_ADMIN_ID
    // And that Paul has written a blog post
    configureBlogPostsPage()
    visitPostCategoryPage("blog-posts", testUserId, UserRole.ADMINISTRATOR)
    cy.get("#portfolio-loading").should("exist")
    cy.get("#portfolio-loading").should("not.exist")
    cy.get("#blog-post-editor-title-input textarea").type("Test Blog Post")
    // When Paul intends to publish the blog post
    // Then the general public can see the blog post
  })
})

function configureBlogPostsPage(): void {
  const fakeGetTaxonomyTermBySlugResponse: GetTaxonomyTermBySlugResponse = createFakeTaxonomyTerm()
  const fakeListHtmlBlogPostsResponse: ListHtmlBlogPostsResponse = [
    createFakeHtmlBlogPost(),
  ]
  cy.intercept(`${FUNCTIONS_BASE_URL}/${GET_TAXONOMY_TERM_BY_SLUG}`, {
    body: fakeGetTaxonomyTermBySlugResponse,
  })
  cy.intercept(`${FUNCTIONS_BASE_URL}/${LIST_HTML_BLOG_POSTS}`, {
    body: fakeListHtmlBlogPostsResponse,
  })
}
