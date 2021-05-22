import { DatabaseDocument } from "@funk/persistence/model/database-document"
import {
  getStore,
  reInitializeStore,
} from "@funk/test/plugins/external/persistence/in-memory-store"
import { get, set } from "lodash"

export function construct() {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void> {
    const doc = get(
      getStore()[collectionPath],
      documentPath.replace(/\//g, "."),
    )
    set(getStore()[collectionPath], documentPath, {
      ...doc,
      ...documentData,
      updatedAt: Date.now(),
    })
    reInitializeStore(getStore())
  }
}

export default construct()
