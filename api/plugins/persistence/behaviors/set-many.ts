import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { chunk } from "lodash"

export function construct(store = storeImpl)
{
  return async function<DocumentType extends Record<string, any> = DatabaseDocument>(
    documentsByCollectionPath: {
      [collectionPath: string]: {
        [documentPath: string]: DocumentType
      },
    },
    options?: { overwrite?: boolean }
  ): Promise<void>
  {
    const MAX_BATCH_SIZE = 500
    const TMP_COLLECTION_DOC_PATH_SEPARATOR = "[PATH_SEP]"

    const batch = store().batch()
    const allPaths = Object.keys(documentsByCollectionPath)
      .reduce((paths, collectionPath) => [
        ...paths,
        ...Object.keys(documentsByCollectionPath[collectionPath]).map((docId) =>
          collectionPath + TMP_COLLECTION_DOC_PATH_SEPARATOR + docId),
      ], [] as string[])
    const pathsInChunks = chunk(allPaths, MAX_BATCH_SIZE)

    for (const paths of pathsInChunks)
    {
      for (const path of paths)
      {
        const collectionPath = path.split(TMP_COLLECTION_DOC_PATH_SEPARATOR)[0]
        const documentPath = path.split(TMP_COLLECTION_DOC_PATH_SEPARATOR)[1]
        const documentData = documentsByCollectionPath[collectionPath][documentPath]
        const docRef = store().collection(collectionPath).doc(documentPath)
        batch.set(
          docRef,
          { ...documentData, updatedAt: Date.now() },
          { merge: !options?.overwrite }
        )
      }
      await batch.commit()
    }
  }
}

export type SetMany = ReturnType<typeof construct>

export default construct()
