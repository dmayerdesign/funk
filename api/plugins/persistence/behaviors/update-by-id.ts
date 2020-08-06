import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"

export function construct(store = storeImpl)
{
  return async function<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>
  ): Promise<void>
  {
    await store().collection(collectionPath)
      .doc(documentPath)
      .update({ ...documentData, updatedAt: Date.now() })
  }
}

export type UpdateById = ReturnType<typeof construct>

export default construct()
