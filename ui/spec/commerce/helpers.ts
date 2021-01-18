import { CLIENT_APP_URL } from "@funk/configuration"
import buildUrl from "@funk/model/ui/atlas/behaviors/build-url"
import type atlas from "@funk/ui/configuration/atlas"
import { SKU_URL } from "@funk/ui/spec/commerce/fixtures"

export function givenACustomer(_name: string): void {
  cy.visit(CLIENT_APP_URL + buildUrl<typeof atlas>("shop", "home"))
}

export function givenThatASkuWasAddedToTheCart(): void {
  cy.visit(`${CLIENT_APP_URL}/${SKU_URL}`)
}
