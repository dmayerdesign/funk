import { MarshalledOrder, PopulatedOrder } from '@funk/model/commerce/order/order'
import marshall from '@funk/plugins/persistence/actions/marshall'

export default function(order: PopulatedOrder): MarshalledOrder
{
  return marshall<MarshalledOrder, PopulatedOrder>(order, [
    'skus',
    'discounts',
  ])
}
