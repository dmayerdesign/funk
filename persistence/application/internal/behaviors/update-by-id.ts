import { store as storeImpl } from "@funk/persistence/application/internal/server-store"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"

export function construct(store: typeof storeImpl) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void> {
    await store()
      .collection(collectionPath)
      .doc(documentPath)
      .update({ ...documentData, updatedAt: Date.now() })
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct(storeImpl)
