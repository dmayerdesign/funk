import { PopulatedOrder } from '@funk/model/commerce/order/order'
import add from '@funk/model/weight/actions/add'
import { Weight } from '@funk/model/weight/weight'

export default function(order: PopulatedOrder): Weight
{
  return order.skus
    .filter(({ netWeight }) => !!netWeight)
    .map(({ netWeight }) => netWeight)
    .reduce(addNullable)
}

function addNullable(weight1: Weight | undefined, weight2: Weight): Weight
{
  const _weight1 = weight1 || { ...weight2, amount: 0 }
  return add(_weight1, weight2)
}
