import { Product } from "@funk/commerce/product/domain/product"

export interface Wishlist {
  /** @required */
  products?: Product[]
  userId?: string
  displayName?: string
}
