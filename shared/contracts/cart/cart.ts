import { Discount } from '../discount/discount'
import { Price } from '../price/price'
import { CartItem } from './cart-item'

export interface Cart {
    count?: number
    products: CartItem[]
    subTotal: Price
    total: Price
    discounts?: Discount[]
}
