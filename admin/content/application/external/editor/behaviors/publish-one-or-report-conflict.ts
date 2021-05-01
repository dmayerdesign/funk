import { GetById as GetContentById } from "@funk/admin/content/application/external/behaviors/persistence/get-by-id"
import { GetPublishConflicts } from "@funk/admin/content/application/external/editor/behaviors/get-publish-conflicts"
import { PublishAndDeleteContentPreview } from "@funk/admin/content/application/external/editor/behaviors/publish-and-delete-content-preview"
import { PublishConflict } from "@funk/admin/content/application/external/editor/publish-conflict"
import { GetById as GetContentPreviewById } from "@funk/admin/content/preview/application/external/behaviors/persistence/get-by-id"
import { Person } from "@funk/identity/person/model/person"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(
  publishAndDeleteContentPreview: PublishAndDeleteContentPreview,
  getContentById: GetContentById,
  getPublishConflicts: GetPublishConflicts,
  getContentPreviewById: GetContentPreviewById,
) {
  return async function (contentId: PrimaryKey, person: Person): Promise<void> {
    try {
      const content = await getContentById(contentId)
      const contentPreview = await getContentPreviewById(contentId)
      const contentWasUpdatedAfterPreview =
        !!content && content.updatedAt! > contentPreview!.updatedAt
      if (contentWasUpdatedAfterPreview) {
        const publishConflicts: PublishConflict[] = [
          ...getPublishConflicts().getValue(),
          [contentPreview!, content!],
        ]
        getPublishConflicts().next(publishConflicts)
      } else {
        await publishAndDeleteContentPreview(person, contentId)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export type PublishOneOrReportConflict = ReturnType<typeof construct>
