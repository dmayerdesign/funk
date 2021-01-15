import { asPromise } from "@funk/helpers/as-promise"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import { GetMaybeContentPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-content-previews"
import { RemoveFromPublishConflicts } from "@funk/ui/core/admin/managed-content/editor/behaviors/remove-from-publish-conflicts"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"

/**
 * "Discard mine"
 */
export function construct(
  getMaybeContentPreviews: GetMaybeContentPreviews,
  userSession: UserSession,
  updateById: UpdateById,
  removeFromPublishConflicts: RemoveFromPublishConflicts,
) {
  return async function (contentId: PrimaryKey): Promise<void> {
    const { person } = await asPromise(userSession)

    const maybeContentPreviews = await getMaybeContentPreviews(person)
    const newContentPreviews = { ...maybeContentPreviews }
    delete newContentPreviews[contentId]
    await updateById<UserState>(USER_STATES, person.id, {
      contentPreviews: newContentPreviews,
    })

    removeFromPublishConflicts(contentId)
  }
}
