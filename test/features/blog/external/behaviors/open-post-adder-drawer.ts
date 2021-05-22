export default function () {
  cy.get(".add-post-button").should("be.visible").click()
  cy.get("#blog-post-editor-drawer").should("be.visible")
}
