import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { getStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { get, set } from "lodash"

export default async function <
  DocumentType extends Record<string, any> = DatabaseDocument
>(
  collectionPath: string,
  documentPath: string,
  documentData: DocumentType,
  options?: { overwrite?: boolean },
): Promise<void> {
  if (!getStore()[collectionPath]) {
    getStore()[collectionPath] = {}
  }
  const doc =
    get(getStore()[collectionPath], documentPath.replace(/\//g, ".")) ?? {}
  set(
    getStore()[collectionPath],
    documentPath,
    options?.overwrite
      ? {
          id: documentPath,
          ...documentData,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
      : {
          id: documentPath,
          ...doc,
          ...documentData,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
  )
}
