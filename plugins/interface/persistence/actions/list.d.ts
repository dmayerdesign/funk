import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'
import { AbstractWhere, Where } from '@funk/plugins/persistence/where'

export default function<DocumentType extends DatabaseDocument>(options: {
  collection: string,
  pagination: Pagination<DocumentType> | VirtualPagination,
  conditions: (Where<DocumentType> | AbstractWhere)[],
}): Promise<DocumentType[]>
