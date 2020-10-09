import { asPromise } from "@funk/helpers/as-promise"
import roleHasAdminPrivilegeOrGreater from "@funk/model/auth/helpers/role-has-admin-privilege-or-greater"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { PublishAndDeleteContentPreview } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-and-delete-content-preview"
import { RemoveFromPublishConflicts } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-from-publish-conflicts"
import { UserSession } from "@funk/ui/core/identity/user-session"

/**
 * "Publish mine anyway"
 */
export function construct(
  userSession: UserSession,
  publishAndDeleteContentPreview: PublishAndDeleteContentPreview,
  removeFromPublishConflicts: RemoveFromPublishConflicts
)
{
  return async function (contentId: PrimaryKey): Promise<void>
  {
    const { person, auth } = await asPromise(userSession)
    // Do nothing if the user is not an admin.
    if (!roleHasAdminPrivilegeOrGreater(auth.claims.role)) return

    await publishAndDeleteContentPreview(person, contentId)

    removeFromPublishConflicts(contentId)
  }
}
