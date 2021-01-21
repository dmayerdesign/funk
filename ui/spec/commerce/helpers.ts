import { CLIENT_APP_URL } from "@funk/configuration"
import buildUrl from "@funk/model/ui/atlas/behaviors/build-url"
import type atlas from "@funk/ui/configuration/atlas"

export function givenACustomer(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>("shop", "home?test_user_id=test-user-basic"),
  )
}

export function givenACustomerAndThatASkuWasAddedToTheCart(
  _name: string,
): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>("shop", "home?test_user_id=test-user-with-cart"),
  )
}
