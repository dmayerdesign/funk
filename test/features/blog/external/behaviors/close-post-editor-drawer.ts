export default function () {
  cy.get("#blog-post-editor-close-button").click()
  cy.get("#blog-post-editor-drawer").should("not.be.visible")
}
