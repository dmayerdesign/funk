import { CollectionReference, Query } from '@angular/fire/firestore'
import { DatabaseDocument, DbDocumentMetadata } from '@funk/model/data-access/database-document'
import { Pagination } from '@funk/plugins/persistence/pagination'
import { Persistence } from '@funk/ui/core/persistence/interface'
import { get } from 'lodash'
import { of, Observable } from 'rxjs'

export class PersistenceStub implements Persistence
{
  public populate = async (doc: any) => doc

  constructor(
    private _mockData: { [collectionPath: string]: any },
    private _mockCollectionMetadata = [{
      collectionPath: 'test.collection',
      documentPath: 'test-doc',
    }]
  )
  { }

  public list<DocumentType extends DatabaseDocument = DatabaseDocument>(
    collectionPath: string,
    _paginationOptions?: Pagination,
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

  public async deleteById<DocumentType extends object = DatabaseDocument>(
    collectionPath: string,
    documentPath: string,
  ): Promise<void>
  { }

  public queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<DbDocumentMetadata[]>
  {
    return Promise.resolve(this._mockCollectionMetadata)
  }
}
