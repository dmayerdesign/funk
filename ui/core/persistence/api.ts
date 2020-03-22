import { Injectable } from '@angular/core'
import { AngularFirestore, CollectionReference, Query } from '@angular/fire/firestore'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { Observable } from 'rxjs'
import { first, map } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class PersistenceApi implements Persistence
{
  public collection = this._store.collection
  public document = this._store.doc

  constructor(
    private _store: AngularFirestore
  ) { }

  public list<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    paginationOptions?: {
      orderBy: (keyof DocumentType & string)
      orderByDirection: 'asc' | 'desc'
      startAt: DocumentType[keyof DocumentType]
    },
  ): Promise<DocumentType[]>
  {
    if (paginationOptions)
    {
      return this._store.collection<DocumentType>(collectionPath)
        .ref
        .orderBy(paginationOptions.orderBy, paginationOptions.orderByDirection)
        .startAt(paginationOptions.startAt)
        .get()
        .then((snapshot) => snapshot.docs) as Promise<DocumentType[]>
    }
    return this._store.collection<DocumentType>(collectionPath)
      .ref
      .get()
      .then((snapshot) => snapshot.docs) as Promise<DocumentType[]>
  }

  public listenById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Observable<DocumentType | undefined>
  {
    return this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .valueChanges()
  }

  public async getById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Promise<DocumentType | undefined>
  {
    return this._store.collection(collectionPath)
      .doc(documentPath)
      .get()
      .pipe(
        first(),
        map((snapshot) => snapshot.data() as DocumentType),
      )
      .toPromise()
  }

  public async setById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
    options?: { overwrite?: boolean },
  ): Promise<void>
  {
    await this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .set(documentData, { merge: !options?.overwrite })
  }

  public async updateById<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void>
  {
    await this._store.collection(collectionPath)
      .doc<DocumentType>(documentPath)
      .update(documentData)
  }

  public queryCollection<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => CollectionReference
  ): Promise<DocumentType[]>
  {
    return selector(
      this._store.collection<DocumentType>(collectionPath).ref
    )
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data())) as Promise<DocumentType[]>
  }

  public queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<{ path: string }[]>
  {
    return selector(
      this._store.collection(collectionPath).ref
    )
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => ({
      path: doc.ref.path,
    })))
  }
}
