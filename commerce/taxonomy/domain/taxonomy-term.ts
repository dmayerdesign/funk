import { DatabaseDocument } from "@funk/persistence/domain/database-document"
import { PrimaryKey } from "@funk/persistence/domain/primary-key"

export interface TaxonomyTerm extends DatabaseDocument {
  taxonomyId: PrimaryKey
  singularName: string
  pluralName: string
  description: string
  parent?: PrimaryKey[]
  children?: PrimaryKey[]
  forInternalUseOnly: boolean
}

export const TAXONOMY_TERMS = "commerce.taxonomy-terms"
