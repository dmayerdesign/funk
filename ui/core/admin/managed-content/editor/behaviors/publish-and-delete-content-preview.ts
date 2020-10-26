import { Person } from "@funk/model/identity/person"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import {
  CONTENTS,
  ManagedContent
} from "@funk/model/managed-content/managed-content"
import { GetMaybeContentPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-content-previews"
import { SetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { UpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"

export function construct(
  setById: SetById,
  updateById: UpdateById,
  getMaybeContentPreviews: GetMaybeContentPreviews
) {
  return async function (person: Person, contentId: string): Promise<void> {
    const contentPreviews = await getMaybeContentPreviews(person)
    await setById<ManagedContent>(
      CONTENTS,
      contentId,
      contentPreviews![contentId].content
    )
    const newContentPreviews = { ...contentPreviews }
    delete newContentPreviews[contentId]
    await updateById<UserState>(USER_STATES, person.id, {
      contentPreviews: newContentPreviews,
    })
  }
}

export type PublishAndDeleteContentPreview = ReturnType<typeof construct>
