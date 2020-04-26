import createUid from '@funk/helpers/create-uid'
import { Customer } from '@funk/model/commerce/order/customer/customer'
import { Order, Status } from '@funk/model/commerce/order/order'

export default function(
  customer: Partial<Customer>, orderData?: Partial<Order>): Order
{
  return {
    id: createUid(),
    status: Status.CART,
    customer,
    skus: [],
    ...orderData,
  }
}
