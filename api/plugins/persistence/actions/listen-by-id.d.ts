import { AngularFirestore } from "@angular/fire/firestore/firestore"
import { Observable } from "rxjs"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export function construct(store: AngularFirestore): typeof listenById

declare function listenById<DocumentType extends object = DatabaseDocument>(
  collectionPath: string,
  documentPath: string
): Observable<DocumentType | undefined>

export type ListenById = typeof listenById
