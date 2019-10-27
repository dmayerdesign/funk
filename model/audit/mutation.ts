import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { Timestamp } from '@funk/model/data-access/timestamp'

export const enum MutationType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface Mutation extends DatabaseDocument {
  type: MutationType
  existingDocumentId?: PrimaryKey
  payload?: any
  httpRequest?: any
  httpResponse?: any
  createdAt: Timestamp
}
