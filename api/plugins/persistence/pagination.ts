import { DatabaseDocument } from "@funk/model/data-access/database-document"

export interface Pagination<DocumentType extends Record<string, unknown> = DatabaseDocument> {
  orderBy: keyof DocumentType
  orderByDirection: "asc" | "desc"
  skip: number
  take: number
}

/**
 * To be used when 'orderBy' is a business rule rather than a database field (like "most relevant").
 */
export interface VirtualPagination {
  orderBy: string
  orderByDirection: "asc" | "desc"
  skip: number
  take: number
}

export const TAKE_ALL = 10000
export const RANDOM_ORDER: Pick<Pagination, "orderBy" | "orderByDirection"> = {
  orderBy: "id",
  orderByDirection: "asc",
}
