import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { getStore } from "@funk/test/plugins/external/persistence/in-memory-store"
import { get } from "lodash"

export function construct() {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(collectionPath: string, documentPaths: string[]): Promise<DocumentType[]> {
    return documentPaths.map(
      (docPath) => get(getStore(), collectionPath, docPath) as DocumentType,
    )
  }
}

export default construct()

export type ListByIds = ReturnType<typeof construct>
