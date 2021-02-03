import { Mutation } from "@funk/audit/domain/mutation"
import diff from "@funk/audit/helpers/internal/diff"
import omitNullish from "@funk/helpers/omit-nullish"
import { store } from "@funk/persistence/application/internal/server-store"
import {
  DatabaseDocument,
  DbDocumentInput,
} from "@funk/persistence/domain/database-document"
import {
  Change,
  ChangeContext,
} from "@funk/persistence/plugins/internal/events/change"

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
