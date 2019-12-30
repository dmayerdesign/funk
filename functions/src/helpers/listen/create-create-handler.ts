import { CloudFunction } from '@funk/plugins/cloud-function/cloud-function'
import { ChangeContext } from '@funk/plugins/db/change'
import { DocumentSnapshot } from '@funk/plugins/db/document-snapshot'
import { storeListener } from '@funk/plugins/db/store-listener'

export default function(
  collectionPath: string,
  handler: (
    snapshot: DocumentSnapshot,
    { params }: ChangeContext,
  ) => Promise<void>,
): CloudFunction<DocumentSnapshot>
{
  return storeListener
    .document(`${collectionPath}/{id}`)
    .onCreate(handler)
}
