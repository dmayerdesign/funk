import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { CloudFunction } from '@funk/plugins/cloud-function/cloud-function'
import { Change, ChangeContext } from '@funk/plugins/db/change'
import { storeListener } from '@funk/plugins/db/store-listener'

export default function(
  collectionPath: string,
  handler: (
    change: Change<DatabaseDocument>,
    { params }: ChangeContext,
  ) => Promise<void>,
): CloudFunction<Change<DatabaseDocument>>
{
  return storeListener
    .document(`${collectionPath}/{id}`)
    .onUpdate(handler)
}
