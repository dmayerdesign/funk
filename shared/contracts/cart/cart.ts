import { Discount } from '../discount/discount'
import { ProductCollection, ProductCollectionType } from '../product/product-collection'

export interface Cart extends ProductCollection {
  type?: ProductCollectionType.CART
  discounts?: Discount[]
}
