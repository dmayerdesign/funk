import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { store } from "@funk/plugins/persistence/server-store"

export default async function<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
  documentData: DocumentType,
  options?: { overwrite?: boolean }
): Promise<void>
{
  await store().collection(collectionPath)
    .doc(documentPath)
    .set(documentData, { merge: !options?.overwrite })
}
