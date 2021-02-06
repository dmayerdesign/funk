import {
  AbstractWhere,
  Where,
} from "@funk/persistence/application/internal/where"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export type Condition<
  DocumentType extends DatabaseDocument = DatabaseDocument
> = Where<DocumentType> | AbstractWhere
