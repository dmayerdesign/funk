import { DatabaseDocument } from "@funk/persistence/domain/database-document"
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
        const collection = documentsByCollectionPath[collectionPath]

        return Object.keys(collection).map((documentPath) =>
          setById(
            collectionPath,
            documentPath,
            collection[documentPath],
            options,
          ),
        )
      }),
    ),
  )
}
