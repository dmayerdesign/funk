export default function (testPostBody: string) {
  cy.get("#go-to-test-data-visualizer").click()
  cy.get("#test-data")
    .should("be.visible")
    // .should("contain.text", testBlogTitle)
    .should("contain.text", testPostBody)
}
