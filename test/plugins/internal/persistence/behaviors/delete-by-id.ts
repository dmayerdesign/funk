import { getStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { unset } from "lodash"

export default async function (
  collectionPath: string,
  documentPath: string,
): Promise<void> {
  unset(getStore()[collectionPath], documentPath.replace(/\//g, "."))
}
