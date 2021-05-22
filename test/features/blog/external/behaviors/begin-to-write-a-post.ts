import closePostEditorDrawer from "./close-post-editor-drawer"
import openPostAdderDrawer from "./open-post-adder-drawer"

export default function ({ body, title }: { body: string; title?: string }) {
  cy.get("#blog-post-editor-title-input input").should("be.focused")
  cy.get("#blog-post-editor-value-container [contenteditable]").type(body)

  // When we try to type into both fields at once, the typing overlaps and overflows in
  // unpredictable ways thanks to buggy behavior in Cypress.
  if (title) {
    closePostEditorDrawer()
    openPostAdderDrawer()
    cy.get("#blog-post-editor-title-input input").should("be.focused")
    cy.get("#blog-post-editor-title-input input").type(title)
  }
}
