import { MarshalledProduct } from '@funk/model/commerce/product/product'
import { AbstractWhere, Where } from '@funk/plugins/persistence/where'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'

declare function list(options: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination,
  conditions: (Where<MarshalledProduct> | AbstractWhere)[]
}): Promise<MarshalledProduct[]>

export default list
