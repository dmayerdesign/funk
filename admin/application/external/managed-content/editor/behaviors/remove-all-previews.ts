import { GetPublishConflicts } from "@funk/admin/application/external/managed-content/editor/behaviors/get-publish-conflicts"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { UpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  updateById: UpdateById,
  userSession: UserSession,
  getPublishConflicts: GetPublishConflicts,
) {
  return async function (): Promise<void> {
    const { person } = await asPromise(userSession)
    const newContentPreviews = {}
    await updateById<UserState>(USER_STATES, person.id, {
      contentPreviews: newContentPreviews,
    })
    getPublishConflicts().next([])
  }
}

export type RemoveAllPreviews = ReturnType<typeof construct>
