import { store } from "@funk/plugins/persistence/server-store"

export const construct: (deps?: { store: typeof store }) => typeof deleteById

export default function deleteById(
  collectionPath: string,
  documentPath: string,
): Promise<void>
