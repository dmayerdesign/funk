import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { Person } from "@funk/model/identity/person"
import { UserState, USER_STATES } from "@funk/model/identity/user-state"
import { ContentPreview } from "@funk/model/managed-content/content-preview"
import {
  CONTENTS,
  ManagedContent
} from "@funk/model/managed-content/managed-content"
import { GetMaybeContentPreviews } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-maybe-content-previews"
import { GetPublishConflicts } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-publish-conflicts"
import { PublishConflict } from "@funk/ui/core/admin/managed-content/editor/publish-conflict"
import { GetById } from "@funk/ui/plugins/persistence/behaviors/get-by-id"
import { SetById } from "@funk/ui/plugins/persistence/behaviors/set-by-id"
import { UpdateById } from "@funk/ui/plugins/persistence/behaviors/update-by-id"

export function construct(
  getById: GetById,
  setById: SetById,
  updateById: UpdateById,
  getPublishConflicts: GetPublishConflicts,
  getMaybeContentPreviews: GetMaybeContentPreviews
) {
  return async function (
    contentId: PrimaryKey,
    contentPreviews: { [contentId: string]: ContentPreview },
    person: Person
  ): Promise<void> {
    const contentPreview = contentPreviews[contentId]
    const content = await getById<ManagedContent>(CONTENTS, contentId)
    const contentWasUpdatedAfterPreview =
      content!.updatedAt! > contentPreview.createdAt
    if (contentWasUpdatedAfterPreview) {
      const publishConflicts: PublishConflict[] = [
        ...getPublishConflicts().getValue(),
        [contentPreview, content!],
      ]
      getPublishConflicts().next(publishConflicts)
    } else {
      await publishAndDeleteContentPreview(person, contentId)
    }
  }

  async function publishAndDeleteContentPreview(
    person: Person,
    contentId: string
  ): Promise<void> {
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

export type PublishOrReportConflict = ReturnType<typeof construct>
