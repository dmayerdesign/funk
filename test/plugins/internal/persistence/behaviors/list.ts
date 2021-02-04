import { Condition } from "@funk/persistence/application/internal/condition"
import {
    Pagination,
    VirtualPagination
} from "@funk/persistence/application/internal/pagination"
import { DatabaseDocument } from "@funk/persistence/model/database-document"
import { getStore } from "@funk/test/plugins/internal/persistence/in-memory-store"
import { difference, get, isEqual, orderBy, values } from "lodash"

export default async function list<
  DocumentType extends DatabaseDocument
>(options: {
  collection: string
  pagination: Pagination<DocumentType> | VirtualPagination
  conditions: Condition<DocumentType>[]
}): Promise<DocumentType[]> {
  const { collection, pagination, conditions } = options
  const allDocs = values(getStore()[collection]).filter((doc) =>
    conditions.every(meetsCondition(doc)),
  )

  const {
    orderBy: orderByKey,
    orderByDirection,
    skip = 0,
    take = allDocs.length - skip,
  } = pagination

  return orderBy(allDocs, orderByKey ?? "id", orderByDirection ?? "asc").slice(
    skip,
    skip + take,
  )
}

const meetsCondition = <DocumentType extends DatabaseDocument>(
  doc: DocumentType,
) => ([path, operator, queryValue]: Condition<DocumentType>) => {
  const value = get(doc, path) as unknown
  switch (operator) {
    case "<":
      return (value as number) < queryValue
    case "<=":
      return (value as number) <= queryValue
    case "==":
      return value === queryValue
    case ">":
      return (value as number) > queryValue
    case ">=":
      return (value as number) >= queryValue
    case "in":
      return !!(queryValue as any[]).find((element) => isEqual(element, value))
    case "array-contains":
      return !!(value as any[]).find((element) => isEqual(element, queryValue))
    case "array-contains-any":
      return difference(queryValue, value as any[]).length < queryValue.length
    default:
      return true
  }
}
