import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'

export interface Mutation extends DatabaseDocument
{
  existingDocumentId: PrimaryKey
  changes: any[]
  createdAt: Timestamp
}
