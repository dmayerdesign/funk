import { CLIENT_APP_URL } from "@funk/configuration"
import atlas from "@funk/ui/atlas/configuration"
import buildUrl from "@funk/ui/atlas/model/behaviors/build-url"

export function givenAUser(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>("shop", "home?test_user_id=test-user-basic"),
  )
}

export function givenAnAdmin(_name: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>("shop", "home?test_user_id=test-user-admin"),
  )
}

export function visitPostCategoryPage(taxonomyTermSlug: string): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>("professional-portfolio", taxonomyTermSlug),
  )
}
