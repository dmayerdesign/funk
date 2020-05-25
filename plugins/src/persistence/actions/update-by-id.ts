import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { store } from "@funk/plugins/persistence/server-store"

export default async function<DocumentType extends DatabaseDocument = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
  documentData: Partial<DocumentType>
): Promise<void>
{
  await store().collection(collectionPath)
    .doc(documentPath)
    .update(documentData)
}
