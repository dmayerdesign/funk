import { Condition } from "@funk/persistence/application/internal/condition"
import { store as storeImpl } from "@funk/persistence/application/internal/server-store"
import { AbstractWhere } from "@funk/persistence/application/internal/where"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import {
  Pagination,
  VirtualPagination,
} from "@funk/persistence/model/pagination"

export function construct(store: typeof storeImpl) {
  return function list<DocumentType extends DatabaseDocument>(options: {
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
}

export type List = ReturnType<typeof construct>

export default construct(storeImpl)
