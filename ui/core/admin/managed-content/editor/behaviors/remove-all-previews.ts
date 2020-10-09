import { asPromise } from "@funk/helpers/as-promise"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import { GetPublishConflicts } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-publish-conflicts"
import { UserSession } from "@funk/ui/core/identity/user-session"
import { UpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"

export function construct(
  updateById: UpdateById,
  userSession: UserSession,
  getPublishConflicts: GetPublishConflicts
)
{
  return async function (): Promise<void>
  {
    const { person } = await asPromise(userSession)
    const newContentPreviews = {}
    await updateById<UserState>(
      USER_STATES,
      person.id,
      {
        contentPreviews: newContentPreviews,
      }
    )
    getPublishConflicts().next([])
  }
}

export type RemoveAllPreviews = ReturnType<typeof construct>
