import { ChangeHandler } from '@funk/functions/helpers/listen/change-handler'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { CloudFunction } from '@funk/plugins/cloud-function/cloud-function'
import { Change } from '@funk/plugins/persistence/change'
import { handleUpdate } from '@funk/plugins/persistence/document-listeners'

export default function<DocumentType extends DatabaseDocument = DatabaseDocument>(
  collectionPath: string,
  handler: ChangeHandler<DocumentType>,
): CloudFunction<Change<DocumentType>>
{
  return handleUpdate(`${collectionPath}/{id}`, handler)
}
