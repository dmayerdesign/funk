export default function () {
  cy.window().then((_window) => {
    cy.get("#blog-post-editor-publish").click()
    cy.get("[role=dialog]").should("be.visible")
    cy.get(".alert-button:not(.alert-button-role-cancel)").click()
  })
}
