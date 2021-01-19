import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { getStore } from "@funk/ui/test/data-access/in-memory-store"
import { get } from "lodash"

export function construct(..._args: any[]) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
  ): Promise<DocumentType | undefined> {
    return get(getStore()[collectionPath], documentPath.replace(/\//g, "."))
  }
}

export default construct()
