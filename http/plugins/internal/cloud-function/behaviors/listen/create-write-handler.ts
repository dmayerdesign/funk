import { ChangeHandler } from "@funk/http/plugins/internal/cloud-function/behaviors/listen/change-handler"
import { CloudFunction } from "@funk/http/plugins/internal/cloud-function/cloud-function"
import { handleWrite } from "@funk/persistence/application/internal/document-listeners"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"

export default function <
  DocumentType extends DatabaseDocument = DatabaseDocument
>(collectionPath: string, handler: ChangeHandler<DocumentType>): CloudFunction {
  return handleWrite<DocumentType>(`${collectionPath}/{id}`, handler) as any
}
