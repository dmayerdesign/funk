import { DbDocumentMetadata } from "@funk/model/data-access/database-document"

export function construct(..._args: any[]) {
  return async function (
    _collectionPath: string,
    _selector: (
      collectionReference: FirebaseFirestore.CollectionReference,
    ) => FirebaseFirestore.Query,
  ): Promise<DbDocumentMetadata[]> {
    throw new Error(
      "QueryCollectionForMetadata is not yet implemented for the in-memory store",
    )
  }
}

export default construct()
