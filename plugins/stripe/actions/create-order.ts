import { orders } from 'stripe'

export interface Output
{
  paidOrder: orders.IOrder
}
