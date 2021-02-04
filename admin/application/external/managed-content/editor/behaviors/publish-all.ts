import { PublishOrReportConflict } from "@funk/admin/application/external/managed-content/editor/behaviors/publish-or-report-conflict"
import { ContentPreview } from "@funk/admin/model/managed-content/content-preview"
import { Person } from "@funk/identity/model/person"

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