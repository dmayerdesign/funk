import { Product } from '../product/product'
import { User } from '../user/user'

export interface Wishlist {
    user: User
    products: Product[]
}
