import { getStore } from "@funk/api/test/data-access/in-memory-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { get, set } from "lodash"

export default async function <
  DocumentType extends Record<string, any> = DatabaseDocument
>(
  collectionPath: string,
  documentPath: string,
  documentData: Partial<DocumentType>,
): Promise<void> {
  const doc = get(getStore()[collectionPath], documentPath.replace(/\//g, "."))
  set(getStore()[collectionPath], documentPath, { ...doc, ...documentData })
}
