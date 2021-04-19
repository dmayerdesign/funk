import { ChangeHandler } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/change-handler"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export default function onlyKeys<DocumentType extends DatabaseDocument>(
  keys: (keyof DocumentType)[],
  handler: ChangeHandler<DocumentType>,
): ChangeHandler<any> {
  return async (change, context) => {
    const { before, after } = change

    const atLeastOneHasChanged = keys.some(
      (key) => before.data()?.[key as string] !== after.data()?.[key as string],
    )

    if (atLeastOneHasChanged) return handler(change, context)
  }
}

export type OnlyKeys = typeof onlyKeys
