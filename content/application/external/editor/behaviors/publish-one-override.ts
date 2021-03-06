import roleHasAdminPrivilegeOrGreater from "@funk/auth/model/helpers/role-has-admin-privilege-or-greater"
import { PublishAndDeleteContentPreview } from "@funk/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { RemoveFromPublishConflicts } from "@funk/content/application/external/editor/behaviors/remove-from-publish-conflicts"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

/**
 * "Publish mine anyway"
 */
export function construct(
  userSession: UserSession,
  publishAndDeleteContentPreview: PublishAndDeleteContentPreview,
  removeFromPublishConflicts: RemoveFromPublishConflicts,
) {
  return async function (contentId: PrimaryKey): Promise<void> {
    const { person, auth } = await asPromise(userSession)
    // Do nothing if the user is not an admin.
    if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) return

    await publishAndDeleteContentPreview(person, contentId)

    removeFromPublishConflicts(contentId)
  }
}

export type PublishOneOverride = ReturnType<typeof construct>
