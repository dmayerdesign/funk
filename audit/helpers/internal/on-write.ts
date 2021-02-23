import diff from "@funk/audit/helpers/internal/diff"
import { Mutation } from "@funk/audit/model/mutation"
import omitNullish from "@funk/helpers/omit-nullish"
import { store } from "@funk/persistence/application/internal/server-store"
import {
  DatabaseDocument,
  DbDocumentInput,
} from "@funk/persistence/model/database-document"
import {
  Change,
  ChangeContext,
} from "@funk/persistence/plugins/internal/events/change"

const TIMESTAMP_ID_SEP = "@"

export default function <DocumentType extends DatabaseDocument>(
  dbPath: string,
): any {
  return async function (
    change: Change<DatabaseDocument>,
    { params }: ChangeContext,
  ): Promise<void> {
    const { id } = params
    const timestamp = Date.now()
    const timestampId = id + TIMESTAMP_ID_SEP + performance.now()
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
