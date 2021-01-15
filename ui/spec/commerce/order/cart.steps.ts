describe("Some feature", () => {
  it("Some test", () => {
    cy.wrap("foo").should("be.a", "string")
  })
})
