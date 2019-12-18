import populate from '@funk/functions/helpers/data-access/populate'
import { DISCOUNTS } from '@funk/model/commerce/discount/discount'
import { MarshalledOrder, PopulatedOrder } from '@funk/model/commerce/order/order'
import { SKUS } from '@funk/model/commerce/product/sku/sku'

export default function(order: MarshalledOrder): Promise<PopulatedOrder>
{
  return populate<PopulatedOrder, MarshalledOrder>(order, [
    { key: 'skus', collectionPath: SKUS },
    { key: 'discounts', collectionPath: DISCOUNTS },
  ])
}
