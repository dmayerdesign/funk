import { getStore } from "@funk/api/test/data-access/in-memory-store"
import { unset } from "lodash"

export default async function (
  collectionPath: string,
  documentPath: string
): Promise<void> {
  unset(getStore()[collectionPath], documentPath.replace(/\//g, "."))
}
