import { GetById } from "@funk/admin/content/application/external/behaviors/persistence/get-by-id"
import { GetPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
import { PublishAndDeleteContentPreview } from "@funk/admin/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { PublishConflict } from "@funk/admin/content/application/external/editor/publish-conflict"
import { ContentPreview } from "@funk/admin/content/model/content-preview"
import { Person } from "@funk/identity/person/model/person"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(
  publishAndDeleteContentPreview: PublishAndDeleteContentPreview,
  getContentById: GetById,
  getPublishConflicts: GetPublishConflicts,
) {
  return async function (
    contentId: PrimaryKey,
    contentPreviews: { [contentId: string]: ContentPreview },
    person: Person,
  ): Promise<void> {
    const contentPreview = contentPreviews[contentId]
    const content = await getContentById(contentId)
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
