import { DatabaseDocument } from "@funk/persistence/model/database-document"
import {
    Change,
    ChangeContext
} from "@funk/persistence/plugins/internal/events/change"

export type ChangeHandler<
  DocumentType extends DatabaseDocument = DatabaseDocument
> = (change: Change<DocumentType>, context: ChangeContext) => Promise<void>
