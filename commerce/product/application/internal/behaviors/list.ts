import {
  MarshalledProduct,
  PRODUCTS,
} from "@funk/commerce/product/domain/product"
import listImpl from "@funk/persistence/application/internal/behaviors/list"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/application/internal/pagination"

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
