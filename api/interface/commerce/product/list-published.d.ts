import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"
import { Condition } from "@funk/plugins/persistence/condition"

declare function list(options: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
}): Promise<MarshalledProduct[]>

export default list
