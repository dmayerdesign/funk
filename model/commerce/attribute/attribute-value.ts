import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { ImageGroup } from "@funk/model/image/image-group"

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
