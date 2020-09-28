import { Condition } from "@funk/api/plugins/persistence/condition"
import { Pagination, VirtualPagination } from "@funk/api/plugins/persistence/pagination"
import store from "@funk/api/test/data-access/in-memory-store"
import { DatabaseDocument } from "@funk/model/data-access/database-document"
import { difference, isEqual, orderBy as _orderBy, values } from "lodash"

export default async function list<DocumentType extends DatabaseDocument>(options: {
  collection: string
  pagination: Pagination<DocumentType> | VirtualPagination
  conditions: Condition<DocumentType>[]
}): Promise<DocumentType[]>
{
  const { collection, pagination, conditions } = options
  const allDocs = values(store[collection]).filter((doc) => conditions.every(meetsCondition(doc)))

  const {
    orderBy,
    orderByDirection,
    skip = 0,
    take = allDocs.length - skip,
  } = pagination

  return _orderBy(
    allDocs,
    orderBy ?? "id",
    orderByDirection ?? "asc")
    .slice(skip, skip + take)
}

const meetsCondition = <DocumentType extends DatabaseDocument>(doc: DocumentType) =>
  ([ key, operator, queryValue ]: Condition<DocumentType>) =>
  {
    const value = doc[key as keyof DocumentType] as unknown
    switch(operator)
    {
      case "<": return (value as number) < queryValue
      case "<=": return (value as number) <= queryValue
      case "==": return value === queryValue
      case ">": return  (value as number) > queryValue
      case ">=": return (value as number) >= queryValue
      case "array-contains":
        return !!(value as any[]).find((element) => isEqual(element, queryValue))
      case "array-contains-any":
        return difference(queryValue, value as any[]).length < queryValue.length
      default: return true
    }
  }
