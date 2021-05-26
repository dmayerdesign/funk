import "cypress-file-upload"

Cypress.on(
  "uncaught:exception",
  // returning false here prevents Cypress from
  // failing the test
  () => true,
)
