import { CloudFunction } from "@funk/api/plugins/cloud-function/cloud-function"
import { ChangeHandler } from "@funk/api/plugins/cloud-function/listen/change-handler"
import { Change } from "@funk/api/plugins/persistence/change"
import { handleWrite } from "@funk/api/plugins/persistence/document-listeners"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export default function <
  DocumentType extends DatabaseDocument = DatabaseDocument
>(
  collectionPath: string,
  handler: ChangeHandler<DocumentType>
): CloudFunction<Change<DocumentType>> {
  return handleWrite<DocumentType>(`${collectionPath}/{id}`, handler) as any
}
