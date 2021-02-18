import diffImpl from "@funk/audit/application/internal/behaviors/diff"
import { Mutation } from "@funk/audit/model/mutation"
import omitNullish from "@funk/helpers/omit-nullish"
import setByIdImpl from "@funk/persistence/application/internal/behaviors/set-by-id"
import {
  DatabaseDocument,
  DbDocumentInput
} from "@funk/persistence/model/database-document"
import {
  Change,
  ChangeContext
} from "@funk/persistence/plugins/internal/events/change"

const TIMESTAMP_ID_SEP = "@"

export function construct(
  setById = setByIdImpl,
  diff = diffImpl
) {
  return function <DocumentType extends DatabaseDocument>(
    dbPath: string,
  ) {
    return async function (
      change: Change<DatabaseDocument>,
      { params }: ChangeContext,
    ): Promise<void> {
      const { id } = params
      const timestamp = Date.now()
      const mutationId = id + TIMESTAMP_ID_SEP + performance.now()
      const beforeData = change.before.data()
      const afterData = change.after.data()

      const changes = diff<DocumentType>(beforeData, afterData)

      if (changes.length) {
        const mutation: DbDocumentInput<Mutation<DocumentType>> = {
          existingDocumentId: id,
          createdAt: timestamp,
          changes: changes.map(omitNullish),
        }
        await setById(dbPath, mutationId, mutation)
      }
    }
  }
}

export type AuditOnWrite = ReturnType<typeof construct>

export default construct()
