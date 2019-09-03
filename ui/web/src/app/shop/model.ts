import { Cart } from '@funk/shared/contracts/cart/cart'

export interface ShopState {
  cart: Cart
}

export const shopInitialState: ShopState = {
  cart: {
    products: []
  }
}

export const enum ShopAction {
  GET_PRODUCTS = 'GET_PRODUCTS',
  LOAD_CART = 'LOAD_CART',
  LOAD_SHOP = 'LOAD_SHOP',
}
