import { CollectionReference, Query } from '@angular/fire/firestore'
import { DbDocumentMetadata } from '@funk/model/data-access/database-document'

export declare function queryCollectionForMetadata(
  collectionPath: string,
  selector: (collectionReference: CollectionReference) => Query
): Promise<DbDocumentMetadata[]>
