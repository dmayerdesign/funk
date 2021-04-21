import { GetPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
import { asPromise } from "@funk/helpers/as-promise"
import { UserSession } from "@funk/identity/application/external/user-session"
import { UpdateById } from "@funk/identity/user-content/application/external/behaviors/persistence/update-by-id"

export function construct(
  updateById: UpdateById,
  userSession: UserSession,
  getPublishConflicts: GetPublishConflicts,
) {
  return async function (): Promise<void> {
    const { person } = await asPromise(userSession)
    const newContentPreviews = {}
    await updateById(person.id, {
      contentPreviews: newContentPreviews,
    })
    getPublishConflicts().next([])
  }
}

export type RemoveAllPreviews = ReturnType<typeof construct>
