import list from '@funk/api/commerce/product/list'
import { MarshalledProduct } from '@funk/model/commerce/product/product'
import { Condition } from '@funk/plugins/persistence/condition'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'

export default function({ pagination, conditions }: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination,
  conditions: Condition<MarshalledProduct>[]
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
