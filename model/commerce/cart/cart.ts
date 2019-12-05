import { Discount } from '@funk/model/commerce/discount/discount'
import { Collection, CollectionType } from '@funk/model/commerce/product/collection'

export interface Cart extends Collection
{
  type?: CollectionType.CART
  discounts?: Discount[]
}

export const CARTS = 'carts'
