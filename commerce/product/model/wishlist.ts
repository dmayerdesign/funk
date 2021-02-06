import { Product } from "@funk/commerce/product/model/product"

export interface Wishlist {
  /** @required */
  products?: Product[]
  userId?: string
  displayName?: string
}
