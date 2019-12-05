import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { AttributeDisplayType } from './attribute-display-type'

export interface Attribute extends DatabaseDocument
{
  name: string
  displayType: AttributeDisplayType
  isScalar: boolean
}
