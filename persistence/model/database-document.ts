import { PrimaryKey } from "@funk/persistence/model/primary-key"
import { Instant } from "@funk/time/model/instant"

export interface DatabaseDocument {
  id: PrimaryKey
  slug?: string
  createdAt?: Instant
  updatedAt?: Instant
}

export interface DocumentData {
  [field: string]: any
}

export type DbDocumentInput<DocumentType = DatabaseDocument> = Omit<
  DocumentType,
  "id" | "createdAt" | "updatedAt" | "removedAt"
>

export interface DbDocumentMetadata {
  collectionPath: string
  documentPath: string
}

export interface CreatedAt {
  createdAt: Instant
}

export interface UpdatedAt {
  updatedAt: Instant
}

export interface RemovedAt {
  removedAt: Instant | null
}

export interface RemovableDatabaseDocument extends DatabaseDocument {
  removedAt?: Instant | null
}
