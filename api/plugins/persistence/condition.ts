import { AbstractWhere, Where } from "@funk/api/plugins/persistence/where"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export type Condition<
  DocumentType extends DatabaseDocument = DatabaseDocument
> = Where<DocumentType> | AbstractWhere
