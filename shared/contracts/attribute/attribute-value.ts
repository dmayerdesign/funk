import { DatabaseDocument } from '../data-access/database-document'
import { PrimaryKey } from '../data-access/primary-key'
import { ImageGroup } from '../image/image-group'

export interface AttributeValue extends DatabaseDocument {
  attributeId: PrimaryKey
  value: string | number
  description?: string
  image?: ImageGroup
  color?: [number, number, number]
}
