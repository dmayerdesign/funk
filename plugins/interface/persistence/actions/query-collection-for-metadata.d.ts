import { CollectionReference, Query } from "@angular/fire/firestore"
import { DbDocumentMetadata } from "@funk/model/data-access/database-document"

export const construct: (store: any) => typeof queryCollectionForMetadata

export default function queryCollectionForMetadata(
  collectionPath: string,
  selector: (collectionReference: CollectionReference) => Query
): Promise<DbDocumentMetadata[]>

export type QueryCollectionForMetadata = typeof queryCollectionForMetadata
