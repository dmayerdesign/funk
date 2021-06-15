import { CancelEdit } from "@funk/content/application/external/editor/behaviors/cancel-edit"
import { SaveIfEditing } from "@funk/content/application/external/editor/behaviors/save-if-editing"

export function construct(
  saveIfEditing: SaveIfEditing,
  cancelEdit: CancelEdit,
) {
  return async function (): Promise<void> {
    await saveIfEditing()
    cancelEdit()
  }
}

export type SaveAndClearIfEditing = ReturnType<typeof construct>
