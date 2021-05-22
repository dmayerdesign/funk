import openPostEditorDrawer from "./open-post-editor-drawer"

export default function (title: string) {
  openPostEditorDrawer(title)
  cy.get(".remove-button").should("be.visible").click()
  cy.get("[role=dialog]").should("be.visible")
  cy.get(".alert-button:not(.alert-button-role-cancel)").click()
}
