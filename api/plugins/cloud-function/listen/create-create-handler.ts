import { CloudFunction } from "@funk/api/plugins/cloud-function/cloud-function"
import { ChangeContext } from "@funk/api/plugins/persistence/change"
import { handleCreate } from "@funk/api/plugins/persistence/document-listeners"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export default function <
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  collectionPath: string,
  handler: (
    snapshot: FirebaseFirestore.DocumentSnapshot,
    { params }: ChangeContext,
  ) => Promise<void>,
): CloudFunction<FirebaseFirestore.QueryDocumentSnapshot<DocumentType>> {
  return handleCreate<DocumentType>(`${collectionPath}/{id}`, handler)
}
