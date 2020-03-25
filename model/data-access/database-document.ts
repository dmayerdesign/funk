import { Timestamp } from '@funk/model/data-access/timestamp'

export interface DatabaseDocument
{
  id: string
  slug?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type DbDocumentInput<DocumentType extends DatabaseDocument> =
  Omit<DocumentType, 'id'>

export interface DbDocumentMetadata
{
  collectionPath: string
  documentPath: string
}
