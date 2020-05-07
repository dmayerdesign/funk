import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { CloudFunction } from '@funk/plugins/cloud-function/cloud-function'
import { ChangeContext } from '@funk/plugins/persistence/change'
import { DocumentSnapshot } from '@funk/plugins/persistence/document-snapshot'
import { storeListener } from '@funk/plugins/persistence/store-listener'

export default function<DocumentType extends DatabaseDocument = DatabaseDocument>(
  collectionPath: string,
  handler: (
    snapshot: DocumentSnapshot<DocumentType>,
    { params }: ChangeContext,
  ) => Promise<void>,
): CloudFunction<DocumentSnapshot<DocumentType>>
{
  return storeListener
    .document<DocumentType>(`${collectionPath}/{id}`)
    .onCreate(handler)
}
