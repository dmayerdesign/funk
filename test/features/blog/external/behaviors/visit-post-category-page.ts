import { UserRole } from "@funk/auth/model/user-role"
import { CLIENT_APP_URL } from "@funk/configuration"
import atlas from "@funk/ui/atlas/configuration"
import buildUrl from "@funk/ui/atlas/model/behaviors/build-url"

export const TEST_USER_BASIC_ID = "test-user-basic"

export default function (
  taxonomyTermSlug: string,
  userId = TEST_USER_BASIC_ID,
  userRole = UserRole.PUBLIC,
): void {
  cy.visit(
    CLIENT_APP_URL +
      buildUrl<typeof atlas>(
        "portfolio",
        taxonomyTermSlug,
        "?test_user_id=" + userId + "&test_user_role=" + userRole,
      ),
  )
  cy.get("#portfolio-loading").should("not.exist")
}
