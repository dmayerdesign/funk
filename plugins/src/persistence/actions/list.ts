import { DatabaseDocument } from '@funk/model/data-access/database-document'
import { Pagination, VirtualPagination } from '@funk/plugins/persistence/pagination'
import { store } from '@funk/plugins/persistence/server-store'
import { AbstractWhere, Where } from '@funk/plugins/persistence/where'

export default function<DocumentType extends DatabaseDocument>(options: {
  collection: string,
  pagination: Pagination<DocumentType> | VirtualPagination,
  conditions: (Where<DocumentType> | AbstractWhere)[],
}): Promise<DocumentType[]>
{
  const { collection, pagination, conditions } = options
  const { orderBy, orderByDirection, skip, take } = pagination
  let query = store().collection(collection)
    .orderBy(orderBy as string, orderByDirection)
    .limit(take)
    .offset(skip)

  conditions.forEach((where) =>
  {
    query = query.where(...(where as AbstractWhere))
  })

  return query
    .get()
    .then((snapshot) => snapshot.docs
      .map((doc) => doc.data())) as Promise<DocumentType[]>
}
