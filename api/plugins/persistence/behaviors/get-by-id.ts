import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export function construct(store: typeof storeImpl) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string
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
