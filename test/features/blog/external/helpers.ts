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
import { CLIENT_APP_URL, FUNCTIONS_BASE_URL } from "@funk/configuration"
import { createFakeTaxonomyTerm } from "@funk/taxonomy/model/stubs"
import atlas from "@funk/ui/atlas/configuration"
import buildUrl from "@funk/ui/atlas/model/behaviors/build-url"

export const TEST_USER_BASIC_ID = "test-user-basic"
export const TEST_USER_ADMIN_ID = "test-user-admin"

export function givenAUser(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>("shop", "home?test_user_id=" + TEST_USER_BASIC_ID),
  )
}

export function givenAnAdmin(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>(
        "shop",
        "home?test_user_id=" +
          TEST_USER_ADMIN_ID +
          "&test_user_role=" +
          UserRole.ADMINISTRATOR,
      ),
  )
}

export function configureBlogPostsPage({
  fakeGetTaxonomyTermBySlugResponse = createFakeTaxonomyTerm({
    id: "blog-posts",
    taxonomyId: "blog-post-categories",
  }),
  fakeListHtmlBlogPostsResponse = [
    createFakeHtmlBlogPost({
      taxonomyTerms: ["blog-posts"],
    }),
  ],
}: {
  fakeGetTaxonomyTermBySlugResponse?: GetTaxonomyTermBySlugResponse
  fakeListHtmlBlogPostsResponse?: ListHtmlBlogPostsResponse
} = {}): void {
  cy.intercept(`${FUNCTIONS_BASE_URL}/${GET_TAXONOMY_TERM_BY_SLUG}`, {
    body: fakeGetTaxonomyTermBySlugResponse,
  })
  cy.intercept(`${FUNCTIONS_BASE_URL}/${LIST_HTML_BLOG_POSTS}`, {
    body: fakeListHtmlBlogPostsResponse,
  })
}
