import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { Timestamp } from "@funk/model/data-access/timestamp"

export interface DatabaseDocument extends Record<string, unknown> {
  id: PrimaryKey
  slug?: string
  updatedAt?: Timestamp
}

export interface DocumentData {
  [field: string]: any
}

export type DbDocumentInput<DocumentType extends DatabaseDocument> =
  Omit<DocumentType, "id">

export interface DbDocumentMetadata {
  collectionPath: string
  documentPath: string
}
