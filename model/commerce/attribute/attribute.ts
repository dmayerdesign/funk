import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { AttributeType } from './attribute-type'

export interface Attribute extends DatabaseDocument {
  type: AttributeType
  name: string
  slug: string
}
