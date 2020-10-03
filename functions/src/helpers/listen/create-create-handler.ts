import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { CloudFunction } from "@funk/api/plugins/cloud-function/cloud-function"
import { ChangeContext } from "@funk/api/plugins/persistence/change"
import { handleCreate } from "@funk/api/plugins/persistence/document-listeners"
import {
  DocumentSnapshot,
  QueryDocumentSnapshot
} from "@funk/api/plugins/persistence/document-snapshot"

export default function<DocumentType extends DatabaseDocument = DatabaseDocument>(
  collectionPath: string,
  handler: (
    snapshot: DocumentSnapshot<DocumentType>,
    { params }: ChangeContext,
  ) => Promise<void>
): CloudFunction<QueryDocumentSnapshot<DocumentType>>
{
  return handleCreate<DocumentType>(`${collectionPath}/{id}`, handler)
}
