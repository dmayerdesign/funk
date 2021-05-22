import { UpdateById } from "@funk/admin/content/application/external/behaviors/persistence/update-by-id"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export function construct(updateById: UpdateById) {
  return async function (contentId: PrimaryKey): Promise<void> {
    await updateById(contentId, {
      removedAt: Date.now(),
    })
  }
}

export type MoveContentToTrash = ReturnType<typeof construct>
