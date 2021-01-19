import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { getStore } from "@funk/ui/test/data-access/in-memory-store"
import { get, set } from "lodash"

export function construct() {
  return async function <
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
      options?.overwrite ? documentData : { ...doc, ...documentData },
    )
  }
}

export default construct()
