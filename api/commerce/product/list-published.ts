import listImpl from "@funk/api/commerce/product/list"
import { Condition } from "@funk/api/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/api/plugins/persistence/pagination"
import { MarshalledProduct } from "@funk/model/commerce/product/product"

export function construct(list: typeof listImpl)
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

export default construct(listImpl)

export type ListPublished = ReturnType<typeof construct>
