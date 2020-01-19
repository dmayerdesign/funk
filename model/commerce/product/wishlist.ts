import { Product } from '@funk/model/commerce/product/product'

export interface Wishlist
{
  products: Product[]
  userId?: string
  displayName?: string
}
