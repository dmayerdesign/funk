import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { Pagination, VirtualPagination } from "@funk/plugins/persistence/pagination"
import { Condition } from "@funk/plugins/persistence/condition"

export default function<DocumentType extends DatabaseDocument>(options: {
  collection: string
  pagination: Pagination<DocumentType> | VirtualPagination
  conditions: Condition<DocumentType>[]
}): Promise<DocumentType[]>
