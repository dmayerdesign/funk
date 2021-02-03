import { Diff } from "@funk/audit/domain/diff"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"
import { Timestamp } from "@funk/persistence/domain/timestamp"

export interface Mutation<DocumentType = Record<string, unknown>>
  extends DatabaseDocument {
  existingDocumentId: PrimaryKey
  changes: Diff<DocumentType>[]
  createdAt: Timestamp
}
