import diff from "@funk/api/functions/helpers/audit/diff"
import { Change, ChangeContext } from "@funk/api/plugins/persistence/change"
import { store } from "@funk/api/plugins/persistence/server-store"
import omitNullish from "@funk/helpers/omit-nullish"
import { Mutation } from "@funk/model/audit/mutation"
import {
  DatabaseDocument,
  DbDocumentInput,
} from "@funk/model/data-access/database-document"

export default function <DocumentType extends DatabaseDocument>(
  dbPath: string,
): any {
  return async function (
    change: Change<DatabaseDocument>,
    { params }: ChangeContext,
  ): Promise<void> {
    const { id } = params
    const timestamp = Date.now()
    const timestampId = `${timestamp}-${Math.random()
      .toString(16)
      .substring(2)}`
    const beforeData = change.before.data()
    const afterData = change.after.data()
    const changes = diff<DocumentType>(beforeData, afterData)

    if (changes.length) {
      const mutation: DbDocumentInput<Mutation<DocumentType>> = {
        existingDocumentId: id,
        createdAt: timestamp,
        changes: changes.map(omitNullish),
      }
      await store().collection(dbPath).doc(timestampId).set(mutation)
    }
  }
}
