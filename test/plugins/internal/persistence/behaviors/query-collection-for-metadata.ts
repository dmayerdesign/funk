import { DbDocumentMetadata } from "@funk/persistence/model/database-document"

export default async function (
  _collectionPath: string,
  _selector: (
    collectionReference: FirebaseFirestore.CollectionReference,
  ) => FirebaseFirestore.Query,
): Promise<DbDocumentMetadata[]> {
  throw new Error(
    "QueryCollectionForMetadata is not yet implemented for the in-memory store",
  )
}
