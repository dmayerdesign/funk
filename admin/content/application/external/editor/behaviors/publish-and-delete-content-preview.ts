import { GetMaybeContentPreviews } from "@funk/admin/content/application/external/editor/behaviors/get-maybe-content-previews"
import {
    Content, CONTENTS
} from "@funk/admin/content/model/content"
import { Person } from "@funk/identity/model/person"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { SetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { UpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"

export function construct(
  setById: SetById,
  updateById: UpdateById,
  getMaybeContentPreviews: GetMaybeContentPreviews,
) {
  return async function (person: Person, contentId: string): Promise<void> {
    const contentPreviews = await getMaybeContentPreviews(person)
    await setById<Content>(
      CONTENTS,
      contentId,
      contentPreviews![contentId].content,
    )
    const newContentPreviews = { ...contentPreviews }
    delete newContentPreviews[contentId]
    await updateById<UserState>(USER_STATES, person.id, {
      contentPreviews: newContentPreviews,
    })
  }
}

export type PublishAndDeleteContentPreview = ReturnType<typeof construct>
