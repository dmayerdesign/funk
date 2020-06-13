import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { PrimaryKey } from "@funk/model/data-access/primary-key"
import { ImageGroup } from "@funk/model/image/image-group"

/**
 * Only structured values are stored using this schema.
 * Scalar values are stored in `Product.attributeValues[attributeId]`.
 */
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
