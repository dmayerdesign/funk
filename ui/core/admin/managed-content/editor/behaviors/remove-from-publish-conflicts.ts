import { GetPublishConflicts } from "@funk/ui/core/admin/managed-content/editor/behaviors/get-publish-conflicts"

export function construct(getPublishConflicts: GetPublishConflicts) {
  return function (contentId: string): void {
    const publishConflicts = [...getPublishConflicts().getValue()]
    const indexOfContentUpdatedAfterPreview = publishConflicts.findIndex(
      ([_, managedContent]) => managedContent.id === contentId,
    )
    if (indexOfContentUpdatedAfterPreview > -1) {
      publishConflicts.splice(indexOfContentUpdatedAfterPreview, 1)
      getPublishConflicts().next(publishConflicts)
    }
  }
}

export type RemoveFromPublishConflicts = ReturnType<typeof construct>
