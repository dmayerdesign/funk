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
    documentData: DocumentType,
    options?: { overwrite?: boolean },
  ): Promise<void> {
    if (!getStore()[collectionPath]) {
      getStore()[collectionPath] = {}
    }
    const doc =
      get(getStore()[collectionPath], documentPath.replace(/\//g, ".")) ?? {}
    const data = options?.overwrite
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
        }
    set(getStore()[collectionPath], documentPath, data)
    reInitializeStore(getStore())
  }
}

export default construct()
