import { AngularFirestore } from "@angular/fire/firestore"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export function construct(store: AngularFirestore) {
  return async function <
    DocumentType extends Record<string, any> = DatabaseDocument
  >(collectionPath: string, documentPaths: string[]): Promise<DocumentType[]> {
    return await store
      .collection(collectionPath)
      .ref.where("id", "in", documentPaths)
      .get()
      .then(
        (snapshot) =>
          snapshot.docs &&
          snapshot.docs.map((doc) => doc.data() as DocumentType),
      )
  }
}

export type ListByIds = ReturnType<typeof construct>
