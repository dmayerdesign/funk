import { Diff } from "@funk/model/audit/diff"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { Timestamp } from "@funk/model/data-access/timestamp"

export interface Mutation<DocumentType = object> extends DatabaseDocument {
  existingDocumentId: PrimaryKey
  changes: Diff<DocumentType>[]
  createdAt: Timestamp
}
