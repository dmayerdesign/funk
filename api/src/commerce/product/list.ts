import { MarshalledProduct, PRODUCTS } from '@funk/model/commerce/product/product'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'
import { store } from '@funk/plugins/persistence/server-store'
import { AbstractWhere, Where } from '@funk/plugins/persistence/where'

export default function(options: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination,
  conditions: (Where<MarshalledProduct> | AbstractWhere)[]
}): Promise<MarshalledProduct[]>
{
  const { orderBy, orderByDirection, skip, take } = options.pagination
  let query = store().collection(PRODUCTS)
    .orderBy(orderBy, orderByDirection)
    .limit(take)
    .offset(skip)

  options.conditions.forEach((where: AbstractWhere) =>
  {
    query = query.where(...where)
  })

  return query
    .get()
    .then((snapshot) => snapshot.docs
      .map((doc) => doc.data())) as Promise<MarshalledProduct[]>
}
