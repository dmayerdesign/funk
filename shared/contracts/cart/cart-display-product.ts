import { Price } from '../price/price'
import { Product } from '../product/product'

export interface CartDisplayProduct {
    quantity: number
    subTotal: Price
    data: Product
}
