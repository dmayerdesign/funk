import listImpl from "@funk/api/plugins/persistence/behaviors/list"
import { Condition } from "@funk/api/plugins/persistence/condition"
import {
  Pagination,
  VirtualPagination
} from "@funk/api/plugins/persistence/pagination"
import {
  MarshalledProduct,
  PRODUCTS
} from "@funk/model/commerce/product/product"

export function construct(list: typeof listImpl) {
  return function (options: {
    pagination: Pagination<MarshalledProduct> | VirtualPagination
    conditions: Condition<MarshalledProduct>[]
  }): Promise<MarshalledProduct[]> {
    const collection = PRODUCTS
    const { pagination, conditions } = options
    return list<MarshalledProduct>({ collection, pagination, conditions })
  }
}

export default construct(listImpl)

export type List = ReturnType<typeof construct>
