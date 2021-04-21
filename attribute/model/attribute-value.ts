import { ImageGroup } from "@funk/image/model/image-group"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { PrimaryKey } from "@funk/persistence/model/primary-key"

export interface SimpleAttributeValue {
  attributeId: PrimaryKey
  displayValue: string
  displayDescription?: string
  displayImage?: ImageGroup
  displayColorRgb?: [number, number, number]
  value: string | number | boolean
}

export interface AttributeValue
  extends DatabaseDocument,
    Omit<SimpleAttributeValue, "value"> {}

export const ATTRIBUTE_VALUES = "commerce.attribute-values"
