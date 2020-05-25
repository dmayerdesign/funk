import { DatabaseDocument } from "@funk/model/data-access/database-document"

export interface Pagination<DocumentType extends object = DatabaseDocument> {
  orderBy: keyof DocumentType
  orderByDirection: "asc" | "desc"
  skip: number
  take: number
}

/**
 * To be used when 'orderBy' is not a field, but a business rule (like "most relevant").
 */
export interface VirtualPagination {
  orderBy: string
  orderByDirection: "asc" | "desc"
  skip: number
  take: number
}

export declare const TAKE_ALL: number
