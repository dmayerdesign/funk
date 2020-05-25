import { store } from "@funk/plugins/persistence/server-store"

export default async function(
  collectionPath: string,
  documentPath: string
): Promise<void>
{
  await store().collection(collectionPath)
    .doc(documentPath)
    .delete()
}
