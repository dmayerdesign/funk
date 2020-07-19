import { Product } from "@funk/model/commerce/product/product"

export interface Wishlist {
  /** @required */
  products?: Product[]
  userId?: string
  displayName?: string
}
