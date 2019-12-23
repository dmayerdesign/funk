import { Sku } from '@funk/model/commerce/product/sku/sku'
import { DatabaseDocument } from '@funk/model/data-access/database-document'

export interface Wishlist extends DatabaseDocument
{
  userId: string
  name: string
  isDefault: boolean
  skus: Sku[]
}
