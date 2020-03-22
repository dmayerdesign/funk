import { AngularFirestoreCollection, AngularFirestoreDocument,
  CollectionReference, Query, QueryFn } from '@angular/fire/firestore'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Observable } from 'rxjs'

export interface Persistence
{
  collection: <T>(path: string, queryFn?: QueryFn | undefined) => AngularFirestoreCollection<T>
  document: <T>(path: string) => AngularFirestoreDocument<T>

  list<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    paginationOptions?: {
      orderBy: (keyof DocumentType & string)
      orderByDirection: 'asc' | 'desc'
      startAt: DocumentType[keyof DocumentType]
    },
  ): Promise<DocumentType[]>

  listenById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Observable<DocumentType | undefined>

  getById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Promise<DocumentType | undefined>

  setById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean },
  ): Promise<void>

  updateById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void>

  queryCollection<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => CollectionReference
  ): Promise<DocumentType[]>

  queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<{ path: string }[]>
}
