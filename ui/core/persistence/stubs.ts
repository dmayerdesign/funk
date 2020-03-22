import { AngularFirestoreCollection, AngularFirestoreDocument,
  CollectionReference, Query, QueryFn } from '@angular/fire/firestore'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { get } from 'lodash'
import { of, Observable } from 'rxjs'

export class PersistenceApiStub implements Persistence
{
  public collection: <T>(path: string, queryFn?: QueryFn | undefined) =>
    AngularFirestoreCollection<T> = (path) => ({
      valueChanges: () => of(this._mockData[path]),
    }) as any
  public document: <T>(path: string) =>
    AngularFirestoreDocument<T> = () => ({
      valueChanges: () => of({}),
    }) as any

  constructor(
    private _mockData: { [collectionPath: string]: any }
  )
  { }

  public list<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    _paginationOptions?: {
      orderBy: (keyof DocumentType & string)
      orderByDirection: 'asc' | 'desc'
      startAt: DocumentType[keyof DocumentType]
    },
  ): Promise<DocumentType[]>
  {
    return Promise.resolve(this._mockData[collectionPath])
  }

  public listenById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Observable<DocumentType | undefined>
  {
    return of(get(this._mockData[collectionPath], documentPath))
  }

  public getById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Promise<DocumentType | undefined>
  {
    return Promise.resolve(get(this._mockData[collectionPath], documentPath))
  }

  public async setById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: DocumentType,
  ): Promise<void>
  { }

  public async updateById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
    documentData: Partial<DocumentType>,
  ): Promise<void>
  { }

  public queryCollection<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => CollectionReference
  ): Promise<DocumentType[]>
  {
    return Promise.resolve([])
  }

  public queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<{ path: string }[]>
  {
    return Promise.resolve([{ path: '' }])
  }
}
