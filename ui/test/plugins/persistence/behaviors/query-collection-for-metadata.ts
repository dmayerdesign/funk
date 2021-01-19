import type { CollectionReference, Query } from "@angular/fire/firestore"
import { DbDocumentMetadata } from "@funk/model/data-access/database-document"

export function construct() {
  return async function (
    _collectionPath: string,
    _selector: (
      collectionReference: CollectionReference,
    ) => Query,
  ): Promise<DbDocumentMetadata[]> {
    return [
      {
        collectionPath: "commerce.orders",
        documentPath: "cart-1"
      }
    ]
  }
}

export default construct()
