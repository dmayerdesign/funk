import { Timestamp } from './timestamp'

export interface DatabaseDocument
{
  id: string
  slug?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type DbDocumentInput<DocumentType extends DatabaseDocument> =
  Omit<DocumentType, 'id'>
