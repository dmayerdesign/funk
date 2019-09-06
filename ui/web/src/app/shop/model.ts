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
  INIT_SHOP = 'INIT_SHOP',
  ADD_TO_CART = 'ADD_TO_CART',
  SUBMIT_ORDER = 'SUBMIT_ORDER',
}
