import { DatabaseDocument } from "@funk/persistence/model/database-document";

export interface EncryptedSecret extends DatabaseDocument {
  value: string
}
