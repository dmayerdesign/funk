import { CLIENT_APP_URL } from "@funk/configuration"
import { givenAnAdmin } from "@funk/test/features/blog/external/helpers"
import { example, rule } from "@funk/test/helpers/external/helpers"
import atlas from "@funk/ui/atlas/configuration"
import buildUrl from "@funk/ui/atlas/model/behaviors/build-url"

rule("An admin can add a blog post.", () => {
  example("Paul intends to add a blog post.", () => {
    // Given an admin named Paul
    givenAnAdmin("Paul")
    // When Paul visits the post category page "blog-posts"
    const blogPostsRoutePath = buildUrl<typeof atlas>("portfolio", "blog-posts")
    cy.visit(CLIENT_APP_URL + blogPostsRoutePath)
    // Then Paul is able to add a post
    cy.get(".add-post-button").click()
    // cy.get("#content-editor-drawer").should("be.visible")
  })
})
