import { List } from "@funk/api/commerce/product/list"
import { MarshalledProduct } from "@funk/model/commerce/product/product"
import { Condition } from "@funk/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"

export function construct(list: List): typeof listPublished

export default function listPublished({ pagination, conditions }: {
  pagination: Pagination<MarshalledProduct> | VirtualPagination
  conditions: Condition<MarshalledProduct>[]
}): Promise<MarshalledProduct[]>

export type ListPublished = ReturnType<typeof construct>
