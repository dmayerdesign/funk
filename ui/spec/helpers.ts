export function waitForTheGlobalLoader(): void {
  cy.get(".spinner", { timeout: 10000 }).should("not.be.visible")
}

export const rule = describe
export const background = beforeEach
export const example = it
