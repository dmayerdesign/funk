import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { getStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { get } from "lodash"

export default async function <
  DocumentType extends Record<string, any> = DatabaseDocument
>(
  collectionPath: string,
  documentPath: string,
): Promise<DocumentType | undefined> {
  return get(getStore()[collectionPath], documentPath.replace(/\//g, "."))
}
