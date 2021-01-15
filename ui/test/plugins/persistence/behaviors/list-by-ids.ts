import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { getStore } from "@funk/ui/test/data-access/in-memory-store"
import { get } from "lodash"

export function construct(..._args: any[]) {
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
