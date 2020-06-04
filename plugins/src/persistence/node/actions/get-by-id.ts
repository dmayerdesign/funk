import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { store as storeImpl } from "@funk/plugins/persistence/server-store"

export function construct(store = storeImpl)
{
  return async function<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string
  ): Promise<DocumentType | undefined>
  {
    return store().collection(collectionPath)
      .doc(documentPath)
      .get()
      .then((snapshot) => snapshot.data() as DocumentType)
  }
}

export default construct()

export type GetById = ReturnType<typeof construct>
