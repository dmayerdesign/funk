import { CloudFunction } from "@funk/http/plugins/internal/cloud-function/cloud-function"
import { handleCreate } from "@funk/persistence/application/internal/document-listeners"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { ChangeContext } from "@funk/persistence/plugins/internal/events/change"

export default function <
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  collectionPath: string,
  handler: (
    snapshot: FirebaseFirestore.DocumentSnapshot,
    { params }: ChangeContext,
  ) => Promise<void>,
): CloudFunction {
  return handleCreate<DocumentType>(`${collectionPath}/{id}`, handler)
}
