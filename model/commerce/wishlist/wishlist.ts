import { Product } from '@funk/model/commerce/product/product'
import { DatabaseDocument } from '@funk/model/data-access/database-document'

export interface Wishlist extends DatabaseDocument
{
  userId: string
  name: string
  isDefault: boolean
  products: Product[]
}
