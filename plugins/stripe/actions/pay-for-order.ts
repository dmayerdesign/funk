import { orders } from 'stripe'

export interface Output
{
  order: orders.IOrder
}
