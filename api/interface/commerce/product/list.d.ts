import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { List as ExecuteList } from "@funk/plugins/persistence/actions/list"
import { Condition } from "@funk/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"

export function construct(executeList: ExecuteList): typeof list

export default function list(options: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
}): Promise<MarshalledProduct[]>

export type List = ReturnType<typeof construct>
