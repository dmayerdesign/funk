import { CLIENT_APP_URL } from "@funk/configuration"
import { SKU_URL } from "@funk/ui/spec/commerce/fixtures"

export function givenACustomer(_name: string): void {
  cy.visit(CLIENT_APP_URL)
}

export function givenThatASkuWasAddedToTheCart(): void {
  cy.visit(`${CLIENT_APP_URL}/${SKU_URL}`)
}
