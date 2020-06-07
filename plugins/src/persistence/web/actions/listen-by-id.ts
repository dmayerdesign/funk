import { AngularFirestore } from "@angular/fire/firestore/firestore"
import { Observable } from "rxjs"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export function construct(store: AngularFirestore)
{
  return function listenById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string
  ): Observable<DocumentType | undefined>
  {
    return store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .valueChanges()
  }
}

export type ListenById = ReturnType<typeof construct>
