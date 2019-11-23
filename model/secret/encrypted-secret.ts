import { DatabaseDocument } from '@funk/model/data-access/database-document'

export interface EncryptedSecret extends DatabaseDocument {
  value: string
}
