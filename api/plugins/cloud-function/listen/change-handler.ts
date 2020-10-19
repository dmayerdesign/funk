import { Change, ChangeContext } from "@funk/api/plugins/persistence/change"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export type ChangeHandler<
  DocumentType extends DatabaseDocument = DatabaseDocument
> = (change: Change<DocumentType>, context: ChangeContext) => Promise<void>
