import { AngularFirestore } from "@angular/fire/firestore/firestore"
import { shareReplayOnce } from "@funk/helpers/rxjs-shims"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { Observable } from "rxjs"

export function construct(store: AngularFirestore) {
  return function listenById<
    DocumentType extends Record<string, any> = DatabaseDocument
  >(
    collectionPath: string,
    documentPath: string,
  ): Observable<DocumentType | undefined> {
    const multicastingStream = store
      .collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .valueChanges()
      .pipe(shareReplayOnce())
    multicastingStream.subscribe()
    return multicastingStream
  }
}

export type ListenById = ReturnType<typeof construct>
