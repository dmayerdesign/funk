import { CollectionReference, Query } from "@angular/fire/firestore"
import { DatabaseDocument, DbDocumentMetadata } from "@funk/model/data-access/database-document"
import { PopulateFieldOptions } from "@funk/plugins/persistence/actions/populate"
import { Observable } from "rxjs"

export const PERSISTENCE = "PERSISTENCE"

export interface AbstractPersistence {
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

  deleteById(
    collectionPath: string,
    documentPath: string,
  ): Promise<void>
}

export interface Persistence extends AbstractPersistence {
  populate<PopulatedType, MarshalledType = any>(
    marshalledDoc: MarshalledType,
    options: PopulateFieldOptions<MarshalledType | PopulatedType>[],
  ): Promise<PopulatedType>

  queryCollectionForMetadata(
    collectionPath: string,
    selector: (collectionReference: CollectionReference) => Query
  ): Promise<DbDocumentMetadata[]>
}
