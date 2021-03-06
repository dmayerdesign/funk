import { AttributeDisplayType } from "@funk/attribute/model/attribute-display-type"
import { DatabaseDocument } from "@funk/persistence/model/database-document"

export interface Attribute extends DatabaseDocument {
  name: string
  displayType: AttributeDisplayType
  isScalar: boolean
}
