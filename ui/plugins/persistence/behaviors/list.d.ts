import { DatabaseDocument } from "@funk/model/data-access/database-document"
import {
  Pagination,
  VirtualPagination,
} from "@funk/ui/plugins/persistence/pagination"
import { Condition } from "@funk/ui/plugins/persistence/condition"

export const construct: (store: any) => typeof list

export default function list<DocumentType extends DatabaseDocument>(options: {
  collection: string
  pagination: Pagination<DocumentType> | VirtualPagination
  conditions: Condition<DocumentType>[]
}): Promise<DocumentType[]>

export type List = typeof list
