import { store as storeImpl } from "@funk/plugins/persistence/server-store"

export const construct = ({ store = storeImpl } = {}) =>
  async function(
    collectionPath: string,
    documentPath: string
  ): Promise<void>
  {
    await store().collection(collectionPath)
      .doc(documentPath)
      .delete()
  }

export default construct()
