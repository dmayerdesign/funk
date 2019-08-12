import { DatabaseDocument } from '../data-access/database-document'
import { Product } from '../product/product'

export interface Wishlist extends DatabaseDocument {
  userId: string
  name: string
  isDefault: boolean
  products: Product[]
}
