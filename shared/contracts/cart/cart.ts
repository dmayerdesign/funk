import { Discount } from '../discount/discount'
import { Price } from '../price/price'
import { Product } from '../product/product'

export interface Cart {
  count?: number
  products: Product[]
  subTotal: Price
  total: Price
  discounts?: Discount[]
}
