import { ChangeHandler } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/change-handler"
import { CloudFunction } from "@funk/http/plugins/internal/cloud-function/cloud-function"
import { handleUpdate } from "@funk/persistence/application/internal/document-listeners"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export default function <
  DocumentType extends DatabaseDocument = DatabaseDocument
>(collectionPath: string, handler: ChangeHandler<DocumentType>): CloudFunction {
  return handleUpdate<DocumentType>(`${collectionPath}/{id}`, handler)
}
