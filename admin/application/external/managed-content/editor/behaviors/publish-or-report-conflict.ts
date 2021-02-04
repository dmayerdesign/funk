import { GetMaybeContentPreviews } from "@funk/admin/application/external/managed-content/editor/behaviors/get-maybe-content-previews"
import { GetPublishConflicts } from "@funk/admin/application/external/managed-content/editor/behaviors/get-publish-conflicts"
import { PublishConflict } from "@funk/admin/application/external/managed-content/editor/publish-conflict"
import { ContentPreview } from "@funk/admin/model/managed-content/content-preview"
import {
    CONTENTS,
    ManagedContent
} from "@funk/admin/model/managed-content/managed-content"
import { Person } from "@funk/identity/model/person"
import { UserState, USER_STATES } from "@funk/identity/model/user-state"
import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { SetById } from "@funk/persistence/application/external/behaviors/set-by-id"
import { UpdateById } from "@funk/persistence/application/external/behaviors/update-by-id"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(
  getById: GetById,
  setById: SetById,
  updateById: UpdateById,
  getPublishConflicts: GetPublishConflicts,
  getMaybeContentPreviews: GetMaybeContentPreviews,
) {
  return async function (
    contentId: PrimaryKey,
    contentPreviews: { [contentId: string]: ContentPreview },
    person: Person,
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
    contentId: string,
  ): Promise<void> {
    const contentPreviews = await getMaybeContentPreviews(person)
    await setById<ManagedContent>(
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

export type PublishOrReportConflict = ReturnType<typeof construct>
