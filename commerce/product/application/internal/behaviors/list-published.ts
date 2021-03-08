import listImpl, {
  List,
} from "@funk/commerce/product/application/internal/behaviors/persistence/list"
import { Product } from "@funk/commerce/product/model/product"
import { Condition } from "@funk/persistence/application/internal/condition"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"

export function construct(list: List) {
  interface Options {
    pagination: Pagination<Product> | VirtualPagination
    conditions: Condition<Product>[]
  }

  return function ({ pagination, conditions }: Options): Promise<Product[]> {
    const IS_PUBLISHED: keyof Product = "isPublished"
    return list({
      pagination,
      conditions: [...conditions, [IS_PUBLISHED, "==", true]],
    })
  }
}

export default construct(listImpl)

export type ListPublished = ReturnType<typeof construct>
