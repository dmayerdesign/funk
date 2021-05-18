export default function (testPostBody: string) {
  cy.get("#blog-post-editor-title-input input").should("be.focused")
  cy.get("#blog-post-editor-value-container [contenteditable]").type(
    testPostBody,
  )
}
