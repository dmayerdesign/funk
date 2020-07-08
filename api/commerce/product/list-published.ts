import listImpl from "@funk/api/commerce/product/list"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Condition } from "@funk/api/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/api/plugins/persistence/pagination"

export function construct(list = listImpl)
{
  interface Options {
    pagination: Pagination<MarshalledProduct> | VirtualPagination
    conditions: Condition<MarshalledProduct>[]
  }

  return function({ pagination, conditions }: Options): Promise<MarshalledProduct[]>
  {
    const IS_PUBLISHED: keyof MarshalledProduct = "isPublished"
    return list({
      pagination,
      conditions: [
        ...conditions,
        [ IS_PUBLISHED, "==", true ],
      ],
    })
  }
}

export default construct()

export type ListPublished = ReturnType<typeof construct>
