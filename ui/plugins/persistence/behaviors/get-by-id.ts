import { AngularFirestore } from "@angular/fire/firestore"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { map } from "rxjs/operators"
import { asPromise } from "@funk/helpers/as-promise"

export function construct(store: AngularFirestore) {
  return function <DocumentType extends Record<string, any> = DatabaseDocument>(
    collectionPath: string,
    documentPath: string
  ): Promise<DocumentType | undefined> {
    return asPromise(
      store
        .collection(collectionPath)
        .doc(documentPath)
        .get()
        .pipe(map((snapshot) => snapshot.data() as DocumentType))
    )
  }
}

export type GetById = ReturnType<typeof construct>
