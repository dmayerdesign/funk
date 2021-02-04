import { UserRole } from "@funk/auth/model/user-role"

export function waitForTheGlobalLoader(): void {
  cy.get(".spinner", { timeout: 10000 }).should("not.be.visible")
}

export function logInWithRole(userRole: UserRole): void {
  if (userRole === UserRole.PUBLIC) {
    cy.visit("sign-in")
  }
  throw new Error(`Signing in with role ${userRole} is not yet supported.`)
}

export const rule = describe
export const background = beforeEach
export const example = it
