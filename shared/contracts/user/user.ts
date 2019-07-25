import { Address } from '../address/address'
import { Cart } from '../cart/cart'
import { Entity } from '../data-access/entity'
import { Image } from '../image/image'
import { Order } from '../order/order'
import { Wishlist } from '../wishlist/wishlist'

export enum UserRole {
  Owner = 'owner',
  Administrator = 'administrator',
}

export interface User extends Entity {
  email: string
  emailIsVerified?: boolean
  emailVerificationToken?: string
  emailTokenExpires?: number
  password?: string
  passwordResetToken?: string
  passwordResetExpires?: string
  role?: UserRole

  name?: string
  lastName?: string
  firstName?: string
  gender?: string
  avatar?: Image
  address?: Address
  phoneNumber?: string

  facebookId?: string
  googleId?: string

  orders?: Order[]
  stripeCustomerId?: string

  cart?: Cart
  wishlist?: Wishlist
}
