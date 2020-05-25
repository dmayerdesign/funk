import { DatabaseDocument } from "@funk/model/data-access/database-document"

export interface Taxonomy extends DatabaseDocument {
  slug: string | "google-product-category"
  singularName?: string | "Google Product Category"
  pluralName?: string | "Google Product Categories"
  description?: string
}

export const TAXONOMIES = "commerce.taxonomies"
