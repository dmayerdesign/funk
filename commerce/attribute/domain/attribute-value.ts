import { ImageGroup } from "@funk/image/domain/image-group"
import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"

export interface AttributeValue extends DatabaseDocument {
  attributeId: PrimaryKey
  displayValue: string
  displayDescription?: string
  displayImage?: ImageGroup
  displayColorRgb?: [number, number, number]
}

export interface MarshalledSkuAttributeValues {
  [attributeId: string]: PrimaryKey | string | number
}

export interface SkuAttributeValues {
  [attributeId: string]: AttributeValue | string | number
}

export interface MarshalledProductAttributeValues {
  [attributeId: string]: PrimaryKey[] | string[] | number[]
}

export interface ProductAttributeValues {
  [attributeId: string]: AttributeValue[] | string[] | number[]
}
