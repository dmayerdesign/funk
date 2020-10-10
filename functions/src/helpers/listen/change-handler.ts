import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { Change, ChangeContext } from "@funk/api/plugins/persistence/change"

export type ChangeHandler<
  DocumentType extends DatabaseDocument = DatabaseDocument
> = (change: Change<DocumentType>, context: ChangeContext) => Promise<void>
