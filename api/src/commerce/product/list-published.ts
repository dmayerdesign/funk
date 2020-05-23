import list from '@funk/api/commerce/product/list'
import { MarshalledProduct } from '@funk/model/commerce/product/product'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'
import { AbstractWhere, Where } from '@funk/plugins/persistence/where'

export default function({ pagination, conditions }: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination,
  conditions: (Where<MarshalledProduct> | AbstractWhere)[]
}): Promise<MarshalledProduct[]>
{
  const IS_PUBLISHED: keyof MarshalledProduct = 'isPublished'
  return list({
    pagination,
    conditions: [
      ...conditions,
      [ IS_PUBLISHED, '==', true ],
    ],
  })
}
