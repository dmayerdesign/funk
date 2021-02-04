import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { Timestamp } from "@funk/persistence/model/timestamp"

export interface DatabaseDocument {
  id: PrimaryKey
  slug?: string
  updatedAt?: Timestamp
}

export interface DocumentData {
  [field: string]: any
}

export type DbDocumentInput<DocumentType extends DatabaseDocument> = Omit<
  DocumentType,
  "id"
>

export interface DbDocumentMetadata {
  collectionPath: string
  documentPath: string
}
