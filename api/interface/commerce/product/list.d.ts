import { MarshalledProduct } from '@funk/model/commerce/product/product'
import { Condition } from '@funk/plugins/persistence/condition'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'

declare function list(options: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination,
  conditions: Condition<MarshalledProduct>[]
}): Promise<MarshalledProduct[]>

export default list
