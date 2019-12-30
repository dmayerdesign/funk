import { Mutation } from '@funk/model/audit/mutation'
import { DatabaseDocument, DbDocumentInput } from '@funk/model/data-access/database-document'
import { Change, ChangeContext } from '@funk/plugins/db/change'
import { store } from '@funk/plugins/db/store'
import diff from './diff'

export default function<DocumentType extends DatabaseDocument>(
  dbPath: string
): any
{
  return async function(
    change: Change<DatabaseDocument>,
    { params }: ChangeContext
  ): Promise<void>
  {
    const { id } = params
    const timestamp = Date.now()
    const timestampId = `${timestamp}-${Math.random().toString(16).substring(2)}`
    const beforeData = change.before.data()
    const afterData = change.after.data()
    const changes = diff<DocumentType>(
      beforeData,
      afterData,
    )

    if (changes.length)
    {
      // Get rid of the misleading 'remove' change when a new document is inserted.
      if (beforeData === undefined
        && changes.length === 2
        && changes[0].key === '$root' && changes[1].key === '$root'
        && changes[0].type === 'remove' && changes[0].value === undefined)
      {
        changes.shift()
      }
      const mutation: DbDocumentInput<Mutation<DocumentType>> = {
        existingDocumentId: id,
        createdAt: timestamp,
        changes: changes.map((_change) =>
        {
          const c = _change
          if (c.value == null) { delete c.value }
          if (c.oldValue == null) { delete c.oldValue }
          return c
        }),
      }
      await store()
        .doc(`${dbPath}/${timestampId}`)
        .set(mutation)
    }
  }
}
