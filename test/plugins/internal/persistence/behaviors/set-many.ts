import { DatabaseDocument } from "@funk/persistence/model/database-document"
import setById from "@funk/test/plugins/internal/persistence/behaviors/set-by-id"
import { flatten } from "lodash"

export default async function <
  DocumentType extends Record<string, any> = DatabaseDocument
>(
  documentsByCollectionPath: {
    [collectionPath: string]: {
      [documentPath: string]: DocumentType
    }
  },
  options?: { overwrite?: boolean },
): Promise<void> {
  await Promise.all(
    flatten(
      Object.keys(documentsByCollectionPath).map((collectionPath) => {
        const collectionUpdates = documentsByCollectionPath[collectionPath]

        return Object.keys(collectionUpdates).map((documentPath) =>
          setById(
            collectionPath,
            documentPath,
            collectionUpdates[documentPath],
            options,
          ),
        )
      }),
    ),
  )
}
