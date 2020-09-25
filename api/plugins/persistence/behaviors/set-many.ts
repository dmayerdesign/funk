import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"
import { chunk } from "lodash"

export function construct(store = storeImpl)
{
  return async function<DocumentType extends Record<string, any> = DatabaseDocument>(
    collectionPath: string,
    documents: { [id: string]: DocumentType },
    options?: { overwrite?: boolean }
  ): Promise<void>
  {
    const MAX_BATCH_SIZE = 500
    const idsInChunks = chunk(Object.keys(documents), MAX_BATCH_SIZE)
    for (const ids of idsInChunks)
    {
      const batch = store().batch()
      for (const documentPath of ids)
      {
        const documentData = documents[documentPath]
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
