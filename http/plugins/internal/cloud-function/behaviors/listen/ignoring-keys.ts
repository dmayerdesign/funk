import { ChangeHandler } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/change-handler"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"

export default function <DocumentType extends DatabaseDocument>(
  keys: (keyof DocumentType)[],
  handler: ChangeHandler<DocumentType>,
): ChangeHandler<any> {
  return async (change, context) => {
    const { before, after } = change

    for (const key of keys) {
      if (before.data()?.[key as string] !== after.data()?.[key as string]) {
        return
      }
    }

    return handler(change, context)
  }
}
