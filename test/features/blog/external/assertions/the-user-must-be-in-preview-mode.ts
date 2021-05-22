export default function () {
  cy.get("#has-preview-notice").should("be.visible")
}
