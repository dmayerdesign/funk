import { AttributeDisplayType } from "@funk/commerce/attribute/domain/attribute-display-type"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"

export interface Attribute extends DatabaseDocument {
  name: string
  displayType: AttributeDisplayType
  isScalar: boolean
}
