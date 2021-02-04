import { AngularFirestore } from "@angular/fire/firestore"
import { asPromise } from "@funk/helpers/as-promise"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { map } from "rxjs/operators"

export function construct(store: AngularFirestore) {
  return function <DocumentType extends Record<string, any> = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Promise<DocumentType | undefined> {
    return asPromise(
      store
        .collection(collectionPath)
        .doc(documentPath)
        .get()
        .pipe(map((snapshot) => snapshot.data() as DocumentType)),
    )
  }
}

export type GetById = ReturnType<typeof construct>
