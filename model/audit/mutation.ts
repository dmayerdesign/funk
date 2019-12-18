import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'
import { Change } from './change'

export interface Mutation<DocumentType = object> extends DatabaseDocument
{
  existingDocumentId: PrimaryKey
  changes: Change<DocumentType>[]
  createdAt: Timestamp
}
