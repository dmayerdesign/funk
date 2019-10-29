import { Cart } from '@funk/model/commerce/cart/cart'

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
  CART_CHANGE_FROM_DB = 'CART_CHANGE_FROM_DB',
}
