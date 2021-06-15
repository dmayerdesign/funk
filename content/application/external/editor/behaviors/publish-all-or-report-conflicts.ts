import { PublishOneOrReportConflict } from "@funk/content/application/external/editor/behaviors/publish-one-or-report-conflict"
import { ContentType } from "@funk/content/model/content"
import { ContentPreview } from "@funk/content/model/content-preview"
import { Person } from "@funk/identity/person/model/person"

export function construct(
  publishOneOrReportConflict: PublishOneOrReportConflict,
) {
  return async function (
    contentPreviews: { [contentId: string]: ContentPreview },
    person: Person,
  ): Promise<void> {
    try {
      await Promise.all(
        Object.keys(contentPreviews)
          .filter(
            (contentId) =>
              contentPreviews[contentId].content.type !==
              ContentType.HTML_BLOG_POST,
          )
          .map((contentId) => publishOneOrReportConflict(contentId, person)),
      )
    } catch (error) {
      // TODO: Communicate this error to the user.
      console.error(error)
    }
  }
}

export type PublishAllOrReportConflicts = ReturnType<typeof construct>
