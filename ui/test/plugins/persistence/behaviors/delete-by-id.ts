import { getStore, getStore$ } from "@funk/ui/test/data-access/in-memory-store"
import { unset } from "lodash"

export default async function (
  collectionPath: string,
  documentPath: string,
): Promise<void> {
  unset(getStore()[collectionPath], documentPath.replace(/\//g, "."))
  getStore$().next(getStore())
}
