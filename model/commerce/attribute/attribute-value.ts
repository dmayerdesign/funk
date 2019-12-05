import { OneOf } from '@funk/helpers/one-of'
import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { ImageGroup } from '@funk/model/image/image-group'

/**
 * Only structured values are stored using this schema.
 * Scalar values are stored in `Product.attributeValues[attributeId]`.
 */
export interface AttributeValue extends DatabaseDocument
{
  attributeId: PrimaryKey
  displayValue: string
  displayDescription?: string
  displayImage?: ImageGroup
  displayColor?: [number, number, number]
}

export interface AttributeValues
{
  [attributeId: string]: OneOf<
    AttributeRefValue, AttributeStringValue, AttributeNumberValue
  >
}

interface AttributeNumberValue
{
  numberValue: number
}

interface AttributeStringValue
{
  stringValue: string
}

interface AttributeRefValue
{
  attributeValueId: PrimaryKey
}
