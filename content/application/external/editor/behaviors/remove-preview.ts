import { RemoveFromPublishConflicts } from "@funk/content/application/external/editor/behaviors/remove-from-publish-conflicts"
import { DeleteById } from "@funk/content/preview/application/external/behaviors/persistence/delete-by-id"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

/**
 * "Discard mine"
 */
export function construct(
  deleteById: DeleteById,
  removeFromPublishConflicts: RemoveFromPublishConflicts,
) {
  return async function (contentId: PrimaryKey): Promise<void> {
    await deleteById(contentId)
    removeFromPublishConflicts(contentId)
  }
}

export type RemovePreview = ReturnType<typeof construct>
