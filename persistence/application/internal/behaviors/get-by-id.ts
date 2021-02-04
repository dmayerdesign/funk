import { store as storeImpl } from "@funk/persistence/application/internal/server-store"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export function construct(store: typeof storeImpl) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
  ): Promise<DocumentType | undefined> {
    return store()
      .collection(collectionPath)
      .doc(documentPath)
      .get()
      .then((snapshot) => snapshot.data() as DocumentType)
  }
}

export default construct(storeImpl)

export type GetById = ReturnType<typeof construct>
