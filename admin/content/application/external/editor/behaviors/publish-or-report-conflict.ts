import { GetPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
import { PublishAndDeleteContentPreview } from "@funk/admin/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { PublishConflict } from "@funk/admin/content/application/external/editor/publish-conflict"
import {
  Content, CONTENTS
} from "@funk/admin/content/model/content"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Person } from "@funk/identity/model/person"
import { GetById } from "@funk/persistence/application/external/behaviors/get-by-id"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(
  getById: GetById,
  publishAndDeleteContentPreview: PublishAndDeleteContentPreview,
  getPublishConflicts: GetPublishConflicts,
) {
  return async function (
    contentId: PrimaryKey,
    contentPreviews: { [contentId: string]: ContentPreview },
    person: Person,
  ): Promise<void> {
    const contentPreview = contentPreviews[contentId]
    const content = await getById<Content>(CONTENTS, contentId)
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
}

export type PublishOrReportConflict = ReturnType<typeof construct>
