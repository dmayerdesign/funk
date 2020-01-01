import { Product } from './product'

export interface Wishlist
{
  products: Product[]
  userId?: string
  displayName?: string
}
