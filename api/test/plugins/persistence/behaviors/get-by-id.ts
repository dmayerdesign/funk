import store from "@funk/api/test/data-access/in-memory-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { get } from "lodash"

export default async function<DocumentType extends Record<string, any> = DatabaseDocument>(
  collectionPath: string,
  documentPath: string
): Promise<DocumentType | undefined>
{
  return get(store[collectionPath], documentPath.replace(/\//g, "."))
}
