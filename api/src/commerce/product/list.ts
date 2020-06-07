import { MarshalledProduct, PRODUCTS } from "@funk/model/commerce/product/product"
import listImpl from "@funk/plugins/persistence/actions/list"
import { Condition } from "@funk/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"

export function construct(list = listImpl)
{
  return function(options: {
    pagination: Pagination<MarshalledProduct> | VirtualPagination
    conditions: Condition<MarshalledProduct>[]
  }): Promise<MarshalledProduct[]>
  {
    const collection = PRODUCTS
    const { pagination, conditions } = options
    return list<MarshalledProduct>({ collection, pagination, conditions })
  }
}

export default construct()

export type List = ReturnType<typeof construct>
