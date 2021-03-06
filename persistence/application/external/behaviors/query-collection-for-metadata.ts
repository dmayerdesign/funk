import { CollectionReference, Query } from "@angular/fire/firestore"
import { AngularFirestore } from "@angular/fire/firestore/firestore"
import {
  DatabaseDocument,
  DbDocumentMetadata,
} from "@funk/persistence/model/database-document"

export function construct(store: AngularFirestore) {
  return async function (
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query,
  ): Promise<DbDocumentMetadata[]> {
    return await selector(
      store.collection(collectionPath).ref as CollectionReference<
        DatabaseDocument
      >,
    )
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

export type QueryCollectionForMetadata = ReturnType<typeof construct>
