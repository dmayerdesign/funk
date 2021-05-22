import closePostEditorDrawer from "./close-post-editor-drawer"
import openPostEditorDrawer from "./open-post-editor-drawer"

export default function ({
  bodyAddition,
  titleAddition,
  titleSearch,
}: {
  bodyAddition: string
  titleAddition?: string
  titleSearch?: string
}) {
  openPostEditorDrawer(titleSearch)
  cy.get("#blog-post-editor-value-container [contenteditable]").type(
    bodyAddition,
  )

  // When we try to type into both fields at once, the typing overlaps and overflows in
  // unpredictable ways thanks to buggy behavior in Cypress.
  if (titleAddition) {
    closePostEditorDrawer()
    openPostEditorDrawer(titleSearch)
    cy.get("#blog-post-editor-title-input input").type(titleAddition)
  }
}
