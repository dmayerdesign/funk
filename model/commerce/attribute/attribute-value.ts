import { OneOf } from '@funk/helpers/one-of'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { ImageGroup } from '@funk/model/image/image-group'

/**
 * Only structured values are stored using this schema.
 * Scalar values are stored in `Product.attributeValues[attributeId]`.
 */
export interface AttributeValue extends DatabaseDocument {
  attributeId: PrimaryKey
  displayValue: string
  displayDescription?: string
  displayImage?: ImageGroup
  displayColor?: [number, number, number]
}

export interface MarshalledAttributeValues {
  [attributeId: string]: OneOf<
    MarshalledAttributeRefValue, AttributeStringValue, AttributeNumberValue
  >
}
export interface PopulatedAttributeValues {
  [attributeId: string]: OneOf<
    PopulatedAttributeRefValue, AttributeStringValue, AttributeNumberValue
  >
}

export type AttributeValues = MarshalledAttributeValues | PopulatedAttributeValues

interface AttributeNumberValue {
  numberValue: number
}

interface AttributeStringValue {
  stringValue: string
}

interface MarshalledAttributeRefValue {
  attributeValue: PrimaryKey
}
interface PopulatedAttributeRefValue {
  attributeValue: PrimaryKey
}
