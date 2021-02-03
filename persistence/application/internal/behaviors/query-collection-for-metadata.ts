import { store as storeImpl } from "@funk/persistence/application/internal/server-store"
import { DbDocumentMetadata } from "@funk/persistence/domain/database-document"

export function construct(store: typeof storeImpl) {
  return async function (
    collectionPath: string,
    selector: (
      collectionReference: FirebaseFirestore.CollectionReference,
    ) => FirebaseFirestore.Query,
  ): Promise<DbDocumentMetadata[]> {
    return await selector(store().collection(collectionPath))
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          const fullPath = doc.ref.path
          const firstIndexOfSlash = fullPath.indexOf("/")
          return {
            collectionPath: fullPath.substring(0, firstIndexOfSlash),
            documentPath: fullPath.substring(firstIndexOfSlash),
          }
        }),
      )
  }
}
export default construct(storeImpl)

export type QueryCollectionForMetadata = ReturnType<typeof construct>
