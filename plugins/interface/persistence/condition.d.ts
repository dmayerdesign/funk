import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { AbstractWhere, Where } from "@funk/plugins/persistence/where"

export type Condition<DocumentType extends DatabaseDocument = DatabaseDocument> =
  Where<DocumentType> | AbstractWhere
