import { DatabaseDocument } from "@funk/persistence/domain/database-document"

export interface EncryptedSecret extends DatabaseDocument {
  value: string
}
