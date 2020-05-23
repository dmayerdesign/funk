import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { store } from '@funk/plugins/persistence/server-store'

export default async function<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string,
): Promise<DocumentType | undefined>
{
  return store().collection(collectionPath)
    .doc(documentPath)
    .get()
    .then((snapshot) => snapshot.data() as DocumentType)
}
