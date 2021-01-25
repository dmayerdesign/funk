import listImpl from "@funk/commerce/product/application/internal/behaviors/list"
import { MarshalledProduct } from "@funk/commerce/product/domain/product"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/application/internal/pagination"

export function construct(list: typeof listImpl) {
  interface Options {
    pagination: Pagination<MarshalledProduct> | VirtualPagination
    conditions: Condition<MarshalledProduct>[]
  }

  return function ({
    pagination,
    conditions,
  }: Options): Promise<MarshalledProduct[]> {
    const IS_PUBLISHED: keyof MarshalledProduct = "isPublished"
    return list({
      pagination,
      conditions: [...conditions, [IS_PUBLISHED, "==", true]],
    })
  }
}

export default construct(listImpl)

export type ListPublished = ReturnType<typeof construct>
