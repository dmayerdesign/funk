import { AttributeValue } from '@funk/model/commerce/attribute/attribute-value'
import { Order } from '@funk/model/commerce/order/order'

export interface ShopState
{
  cart: Partial<Order>
  attributeValues: AttributeValue[]
}

export const enum ShopAction
{
  GET_PRODUCTS = 'GET_PRODUCTS',
  INIT_SHOP = 'INIT_SHOP',
  ADD_TO_CART = 'ADD_TO_CART',
  SUBMIT_ORDER = 'SUBMIT_ORDER',
  CART_CHANGE_FROM_DB = 'CART_CHANGE_FROM_DB',
}
