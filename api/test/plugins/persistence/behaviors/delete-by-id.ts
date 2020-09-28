import store from "@funk/api/test/data-access/in-memory-store"
import { unset } from "lodash"

export default async function(
  collectionPath: string,
  documentPath: string
): Promise<void>
{
  unset(store[collectionPath], documentPath.replace(/\//g, "."))
}
