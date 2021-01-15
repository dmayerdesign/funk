import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export function construct(store: typeof storeImpl) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    await store()
      .collection(collectionPath)
      .doc(documentPath)
      .set(
        { ...documentData, updatedAt: Date.now() },
        { merge: !options?.overwrite },
      )
  }
}

export type SetById = ReturnType<typeof construct>

export default construct(storeImpl)
