import { ChangeHandler } from "@funk/functions/helpers/listen/change-handler"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { CloudFunction } from "@funk/api/plugins/cloud-function/cloud-function"
import { Change } from "@funk/api/plugins/persistence/change"
import { handleUpdate } from "@funk/api/plugins/persistence/document-listeners"
import { QueryDocumentSnapshot } from "@funk/api/plugins/persistence/document-snapshot"

export default function<DocumentType extends DatabaseDocument = DatabaseDocument>(
  collectionPath: string,
  handler: ChangeHandler<DocumentType>
): CloudFunction<Change<QueryDocumentSnapshot<DocumentType>>>
{
  return handleUpdate<DocumentType>(`${collectionPath}/{id}`, handler) as
    CloudFunction<Change<QueryDocumentSnapshot<DocumentType>>>
}
