import { Person } from "@funk/model/identity/person"
import { ContentPreview } from "@funk/model/managed-content/content-preview"
import { PublishOrReportConflict } from "@funk/ui/core/admin/managed-content/editor/behaviors/publish-or-report-conflict"

export function construct(publishOrReportConflict: PublishOrReportConflict) {
  return async function (
    contentPreviews: { [contentId: string]: ContentPreview },
    person: Person,
  ): Promise<void> {
    for (const contentId of Object.keys(contentPreviews!)) {
      try {
        await publishOrReportConflict(contentId, contentPreviews!, person)
      } catch (error) {
        // TODO: Communicate this error to the user.
        console.error(error)
        continue
      }
    }
  }
}

export type PublishAll = ReturnType<typeof construct>
