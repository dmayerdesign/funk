import { Condition } from "@funk/api/plugins/persistence/condition"
import {
  Pagination,
  VirtualPagination
} from "@funk/api/plugins/persistence/pagination"
import { store } from "@funk/api/plugins/persistence/server-store"
import { AbstractWhere } from "@funk/api/plugins/persistence/where"
import { DatabaseDocument } from "@funk/model/data-access/database-document"

export default function list<DocumentType extends DatabaseDocument>(options: {
  collection: string
  pagination: Pagination<DocumentType> | VirtualPagination
  conditions: Condition<DocumentType>[]
}): Promise<DocumentType[]> {
  const { collection, pagination, conditions } = options
  const { orderBy, orderByDirection, skip, take } = pagination
  let query = store()
    .collection(collection)
    .orderBy(orderBy as string, orderByDirection)
    .limit(take)
    .offset(skip)

  conditions.forEach((where) => {
    query = query.where(...(where as AbstractWhere))
  })

  return query
    .get()
    .then((snapshot) => snapshot.docs.map((doc) => doc.data())) as Promise<
    DocumentType[]
  >
}

export type List = typeof list
