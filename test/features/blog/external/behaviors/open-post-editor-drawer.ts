export default function (title?: string) {
  if (title) {
    cy.get(".post")
      .should("contain.text", title)
      .get(".edit-post-button")
      .first()
      .click()
  } else {
    cy.get(".post .edit-post-button").first().click()
  }
  cy.get("#blog-post-editor-drawer").should("be.visible")
}
