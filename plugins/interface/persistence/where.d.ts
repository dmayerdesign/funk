import { DatabaseDocument } from "@funk/model/data-access/database-document"

type WhereOperator = "<"|"<="|"=="|">"|">="|"array-contains"|"in"|"array-contains-any"
export type Where<
  DocumentType extends DatabaseDocument,
  Key extends keyof DocumentType = keyof DocumentType> =
  [ Key, WhereOperator, DocumentType[Key] | DocumentType[Key][] ]
export type AbstractWhere =
  [ string, WhereOperator, any ]
