import { CollectionReference, Query } from '@angular/fire/firestore'
import { DatabaseDocument, DbDocumentMetadata } from '@funk/model/data-access/database-document'
import { Observable } from 'rxjs'

export const PERSISTENCE = 'PERSISTENCE'

export interface Persistence {
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

  queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<DbDocumentMetadata[]>
}
