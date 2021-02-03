import { GetMaybeContentPreviews } from "@funk/admin/application/external/managed-content/editor/behaviors/get-maybe-content-previews"
import { RemoveFromPublishConflicts } from "@funk/admin/application/external/managed-content/editor/behaviors/remove-from-publish-conflicts"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserState, USER_STATES } from "@funk/identity/domain/user-state"
import { UpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"

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
