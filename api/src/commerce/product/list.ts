import { MarshalledProduct, PRODUCTS } from "@funk/model/commerce/product/product"
import list from "@funk/plugins/persistence/actions/list"
import { Condition } from "@funk/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"

export default function(options: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
}): Promise<MarshalledProduct[]>
{
  const collection = PRODUCTS
  const { pagination, conditions } = options
  return list<MarshalledProduct>({ collection, pagination, conditions })
}
