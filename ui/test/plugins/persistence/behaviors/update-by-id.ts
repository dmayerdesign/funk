import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { getStore } from "@funk/ui/test/data-access/in-memory-store"
import { get, set } from "lodash"

export function construct() {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void> {
    const doc = get(getStore()[collectionPath], documentPath.replace(/\//g, "."))
    set(getStore()[collectionPath], documentPath, { ...doc, ...documentData })
  }
}

export default construct()
