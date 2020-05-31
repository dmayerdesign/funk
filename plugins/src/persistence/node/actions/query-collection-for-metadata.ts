import { DbDocumentMetadata } from "@funk/model/data-access/database-document"
import { store } from "@funk/plugins/persistence/server-store"

export default function(
  collectionPath: string,
  selector: (collectionReference: FirebaseFirestore.CollectionReference) =>
  FirebaseFirestore.Query
): Promise<DbDocumentMetadata[]>
{
  return selector(
    store().collection(collectionPath)
  )
    .get()
    .then((snapshot) => snapshot.docs.map((doc) =>
    {
      const fullPath = doc.ref.path
      const firstIndexOfSlash = fullPath.indexOf("/")
      return {
        collectionPath: fullPath.substring(0, firstIndexOfSlash),
        documentPath: fullPath.substring(firstIndexOfSlash),
      }
    }))
}
