import { AttributeDisplayType } from "@funk/model/commerce/attribute/attribute-display-type"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export interface Attribute extends DatabaseDocument {
  name: string
  displayType: AttributeDisplayType
  isScalar: boolean
}
