import { AttributeValue } from '@funk/model/commerce/attribute/attribute-value'
import { Order } from '@funk/model/commerce/order/order'

export interface ShopState
{
  cart: Partial<Order>
  attributeValues: AttributeValue[]
}
