import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { PrimaryKey } from '@funk/model/data-access/primary-key'
import { ImageGroup } from '@funk/model/image/image-group'

export interface AttributeValue extends DatabaseDocument {
  attributeId: PrimaryKey
  value: string | number
  description?: string
  image?: ImageGroup
  color?: [number, number, number]
}