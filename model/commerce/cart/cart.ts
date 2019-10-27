import { Discount } from '@funk/model/commerce/discount/discount'
import { ProductCollection, ProductCollectionType } from '@funk/model/commerce/product/product-collection'

export interface Cart extends ProductCollection {
  type?: ProductCollectionType.CART
  discounts?: Discount[]
}

export const CARTS = 'carts'
