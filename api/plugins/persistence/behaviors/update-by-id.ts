import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export function construct(store: typeof storeImpl) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>
  ): Promise<void> {
    await store()
      .collection(collectionPath)
      .doc(documentPath)
      .update({ ...documentData, updatedAt: Date.now() })
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(storeImpl)
