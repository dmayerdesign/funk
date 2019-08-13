import { Discount } from '../discount/discount'
import { Product } from '../product/product'

export interface Cart {
  products: Product[]
  discounts?: Discount[]
}
