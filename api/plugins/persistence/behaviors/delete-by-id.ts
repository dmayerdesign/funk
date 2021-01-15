import { store as storeImpl } from "@funk/api/plugins/persistence/server-store"

export function construct(store: typeof storeImpl) {
  return async function (
    collectionPath: string,
    documentPath: string,
  ): Promise<void> {
    await store().collection(collectionPath).doc(documentPath).delete()
  }
}

export type DeleteById = ReturnType<typeof construct>

export default construct(storeImpl)
