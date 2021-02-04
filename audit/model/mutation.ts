import { Diff } from "@funk/audit/model/diff"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { Timestamp } from "@funk/persistence/model/timestamp"

export interface Mutation<DocumentType = Record<string, unknown>>
  extends DatabaseDocument {
  existingDocumentId: PrimaryKey
  changes: Diff<DocumentType>[]
  createdAt: Timestamp
}
