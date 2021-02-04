import {
    AbstractWhere,
    Where
} from "@funk/persistence/application/external/where"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export type Condition<
  DocumentType extends DatabaseDocument = DatabaseDocument
> = Where<DocumentType> | AbstractWhere
