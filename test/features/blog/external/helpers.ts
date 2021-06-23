import { UserRole } from "@funk/auth/model/user-role"
import { functionName as GET_TAXONOMY_TERM_BY_SLUG } from "@funk/blog/infrastructure/external/cloud-functions/get-taxonomy-term-by-slug"
import { functionName as LIST_HTML_BLOG_POSTS } from "@funk/blog/infrastructure/external/cloud-functions/list-html-blog-posts"
import { CLIENT_APP_URL, FUNCTIONS_BASE_URL } from "@funk/configuration"
import { Content, CONTENTS } from "@funk/content/model/content"
import { STORE_SERVER_PORT } from "@funk/test/plugins/external/persistence/configuration"
import atlas from "@funk/ui/atlas/configuration"
import buildUrl from "@funk/ui/atlas/model/behaviors/build-url"
import http from "axios"
import { pickBy, values } from "lodash"

export const TEST_USER_BASIC_ID = "test-user-basic"
export const TEST_USER_ADMIN_ID = "test-user-admin"

export function givenAUser(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>(
        "portfolio",
        "blog-posts?test_user_id=" + TEST_USER_BASIC_ID,
      ),
  )
}

export function givenAnAdmin(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>(
        "portfolio",
        "blog-poststest_user_id=" +
          TEST_USER_ADMIN_ID +
          "&test_user_role=" +
          UserRole.ADMINISTRATOR,
      ),
  )
}

export function tearDownBlogPostsPage(): void {
  cy.task("tearDown")
}

export function configureBlogPostsPage(): void {
  cy.task("setUp")
  cy.intercept(
    `${FUNCTIONS_BASE_URL}/${GET_TAXONOMY_TERM_BY_SLUG}`,
    async (req) => {
      const { data: store } = await http.get(
        `http://localhost:${STORE_SERVER_PORT}/store`,
      )
      const taxonomyTerm = store["taxonomy-terms"]["blog-posts"]
      req.reply(taxonomyTerm)
    },
  )
  cy.intercept(`${FUNCTIONS_BASE_URL}/${LIST_HTML_BLOG_POSTS}`, async (req) => {
    const store: Record<string, any> = (
      await http.get(`http://localhost:${STORE_SERVER_PORT}/store`)
    ).data
    const blogPostsContents = values(
      pickBy(store[CONTENTS], ({ taxonomyTerms }) =>
        taxonomyTerms?.includes("blog-posts"),
      ),
    )
    req.reply(
      blogPostsContents.filter(
        ({ taxonomyTerms, removedAt }) =>
          removedAt == null && taxonomyTerms?.includes("blog-posts"),
      ),
    )
  })
}

export function theSavedContentsShouldMatch<ContentType = Content>(
  predicate: (contents: Record<string, ContentType>) => boolean,
): void {
  cy.get("#go-to-test-data-visualizer").click()
  cy.get("#test-data").should("be.visible")
  cy.get("#test-data")
    .invoke("text")
    .then((text) => {
      try {
        const parsedData = JSON.parse(text.trim())
        const contents = parsedData[CONTENTS] as Record<string, ContentType>
        return predicate(contents)
      } catch (error) {
        console.error(error)
        return false
      }
    })
    .should("be.true")
}
